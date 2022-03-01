// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getHomefeedContentInBatches
exports.getHomefeedContentInBatches = async (req, res) => {
  // incoming: contentTypeArray: array [music, events, etc.], sortBy: string -> "newest", "popular", "etc.",
  //           tagArray: array [classical, edm, etc.]
  // outgoing: content, error

  // get data from frontend
  const { uid, contentTypeArray, sortBy, startIndex, endIndex, tagArray } =
    req.body;
  var numberOfRecords = endIndex - startIndex + 1;

  var error = "";
  var results = [];
  var responseCode = 0;

  var insertString = `SELECT content.id,user.uid,content.imageFilepathArray,
  content.contentText,content.location,content.timestamp,
  content.audioFilepath,content.sheetMusicFilepath,content.contentType,
  content.websiteLink,content.contentType,content.contentName,
  content.mapsEnabled,content.collaborators,content.description,
  content.fromDate,content.toDate,content.isDateCurrent,
  content.price,content.audioFilename,content.sheetMusicFilename,
  content.imageFilepath,content.imageFilename,content.isFeaturedSong,
  user.username,userProfile.displayName,userProfile.profilePicPath,content.isEdited,
  COUNT(likes.id) AS likeCount, 
  (SELECT COUNT(comment.id) FROM comment WHERE comment.contentID=content.id) AS commentCount,
  SUM(CASE WHEN likes.contentID = content.id AND likes.uid = ? THEN true ELSE false END) AS isLikedByLoggedInUser
  FROM content 
  INNER JOIN user ON content.userID=user.id
  INNER JOIN userProfile ON content.userID=userProfile.userID 
  LEFT JOIN likes ON content.id=likes.contentID `;
  if (tagArray && tagArray.length > 0) {
    insertString += "INNER JOIN contentTag ON ";
    for (var tag of tagArray) {
      insertString += "contentTag.tagID=" + tag.id + " OR ";
    }
    insertString = insertString.slice(0, -3);
    insertString += "AND contentTag.contentID=content.id ";
  }
  // if contentTypeArray has contentTypes, build string
  if (contentTypeArray && contentTypeArray.length > 0) {
    insertString += "WHERE ";
    for (var contentT of contentTypeArray) {
      insertString += `contentType='${contentT}' OR `;
    }
    insertString = insertString.slice(0, -4);
    insertString += " GROUP BY content.id";
  } else {
    insertString += "WHERE ";
    insertString +=
      "contentType='music' OR contentType='event' OR contentType='article'";
    insertString += " GROUP BY content.id";
  }
  if (sortBy == "newest" || !sortBy) {
    // append order by desc
    insertString += " ORDER BY timestamp DESC";
  } else {
    // do some algos
    // filter by popularity -> show the content w/largest likeCount in DESC order
    // get likeCount for content and show most liked first
    //SELECT DISTINCT COUNT(id) FROM
    insertString += " ORDER BY likeCount DESC";
  }
  // limit for batches
  insertString += " LIMIT ?,?;";

  mysql_pool.getConnection(function (err, connection2) {
    connection2.query(
      insertString,
      [uid, startIndex, numberOfRecords],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            results = result;
            responseCode = 200;
          } else {
            error = "Content does not exist";
            responseCode = 500;
          }
        }
        var ret = {
          result: results,
          error: error,
        };
        // send data
        res.status(responseCode).json(ret);
        connection2.release();
      }
    );
  });
};
