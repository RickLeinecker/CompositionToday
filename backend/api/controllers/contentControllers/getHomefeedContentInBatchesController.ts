// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getHomefeedContentInBatches
exports.getHomefeedContentInBatches = async (req, res) => {
  // incoming: contentTypeArray: array [music, event, article, contest], sortBy: string -> "newest", "popular", "relevant",
  //           tagArray: array [classical, edm, etc.]
  // outgoing: content, error

  // get data from frontend
  const { uid, contentTypeArray, sortBy, startIndex, endIndex, tagArray } =
    req.body;
  var numberOfRecords = endIndex - startIndex + 1;

  var error = "";
  var results = [];
  var responseCode = 0;
  var insertArray = [];
  insertArray.push(uid);

  var insertString = `SELECT content.id,user.uid,user.isPublisher,content.imageFilepathArray,
  content.contentText,content.location,content.timestamp,
  content.audioFilepath,content.sheetMusicFilepath,content.contentType,
  content.websiteLink,content.contentType,content.contentName,
  content.mapsEnabled,content.collaborators,content.description,
  content.fromDate,content.toDate,content.isDateCurrent,
  content.price,content.audioFilename,content.sheetMusicFilename,
  content.imageFilepath,content.imageFilename,content.isFeaturedSong,content.isContest,
  user.username,userProfile.displayName,userProfile.profilePicPath,content.isEdited,
  COUNT(likes.id) AS likeCount, 
  (SELECT COUNT(comment.id) FROM comment WHERE comment.contentID=content.id) AS commentCount,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',t.id,'tagName',t.tagName)) AS tagArray1 FROM (SELECT DISTINCT tag.id, tag.tagName FROM tag INNER JOIN contentTag ON tag.id=contentTag.tagID AND contentTag.contentID=content.id) AS t) AS tagArray,
  SUM(CASE WHEN likes.contentID = content.id AND likes.uid = ? THEN true ELSE false END) AS isLikedByLoggedInUser
  FROM content 
  INNER JOIN user ON content.userID=user.id
  INNER JOIN userProfile ON content.userID=userProfile.userID 
  LEFT JOIN likes ON content.id=likes.contentID `;
  if (tagArray && tagArray.length > 0) {
    insertString += "INNER JOIN (SELECT * FROM contentTag WHERE ";
    for (var tag of tagArray) {
      insertString += "tagID=? OR ";
      insertArray.push(tag.id);
    }
    insertString = insertString.slice(0, -3);
    insertString += ") AS ct1 ON ct1.contentID=content.id ";
  }

  // if sort by relevant content, then do necessary joins
  if (sortBy === "relevant") {
    // filter by relevancy -> show content with tags liked by user
    // join some tables based on tags
    insertString += ` INNER JOIN (SELECT contentTag.contentID FROM contentTag INNER JOIN (SELECT likes.uid, contentTag.contentID, contentTag.tagID 
      FROM likes INNER JOIN contentTag ON likes.contentID=contentTag.contentID WHERE likes.uid=?) AS relevantContent1
      ON relevantContent1.tagID=contentTag.tagID) AS relevantContent2
      ON relevantContent2.contentID=content.id `;
    insertArray.push(uid);
  }

  // if contentTypeArray has contentTypes, build string
  if (contentTypeArray && contentTypeArray.length > 0) {
    if (
      contentTypeArray.find((string) => string === "contest") &&
      contentTypeArray.length === 1
    ) {
      insertString += "WHERE isContest=1 ";
    } else {
      insertString += "WHERE ";
      for (var contentT of contentTypeArray) {
        if (contentT !== "contest") {
          insertString += `contentType=? OR `;
          insertArray.push(contentT);
        }
      }
      insertString += " isContest=1 ";
      // insertString = insertString.slice(0, -4);
    }
    insertString += " GROUP BY content.id";
  } else {
    insertString += "WHERE ";
    insertString +=
      "contentType='music' OR contentType='event' OR contentType='article'";
    insertString += " GROUP BY content.id";
  }

  // sort by popular or else sort by timestamp
  if (sortBy === "popular") {
    // filter by popularity -> show content w/largest likeCount in DESC order
    insertString += " ORDER BY likeCount DESC";
  } else {
    // by defeault, show results in descending order
    insertString += " ORDER BY timestamp DESC";
  }

  // limit for batches
  insertArray.push(startIndex);
  insertArray.push(numberOfRecords);
  insertString += " LIMIT ?,?;";

  mysql_pool.getConnection(function (err, connection2) {
    connection2.query(insertString, insertArray, function (err, result) {
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
          responseCode = 200;
        }
      }
      var ret = {
        result: results,
        error: error,
      };
      // send data
      res.status(responseCode).json(ret);
      connection2.release();
    });
  });
};
