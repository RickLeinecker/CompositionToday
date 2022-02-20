// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getContentByType
exports.getUserContentByType = async (req, res) => {
  // incoming: contentType, uid
  // outgoing: content, error
  /*
      `SELECT content.id,content.userID,content.contentText,
      content.contentName,content.timestamp,content.audioFilepath,
      content.audioFilename,content.sheetMusicFilepath,content.sheetMusicFilename,
      content.description,user.username,userProfile.displayName,userProfile.profilePicPath 
      FROM content INNER JOIN user ON content.userID=user.id INNER JOIN userProfile 
      ON content.userID=userProfile.userID 
      WHERE content.contentType=? AND content.userID=?`



      // selecting on uid v1
      `SELECT content.id,content.userID,content.imageFilepathArray,
      content.contentText,content.location,content.timestamp,
      content.audioFilepath,content.sheetMusicFilepath,content.contentType,
      content.websiteLink,content.contentType,content.contentName,
      content.mapsEnabled,content.collaborators,content.description,
      content.fromDate,content.toDate,content.isDateCurrent,
      content.price,content.audioFilename,content.sheetMusicFilename,
      content.imageFilepath,content.imageFilename,content.isFeaturedSong,
      user.username,userProfile.displayName,userProfile.profilePicPath 
      FROM content
      INNER JOIN user ON content.userID=user.id
      INNER JOIN userProfile 
      ON content.userID=userProfile.userID 
      WHERE content.contentType=? AND user.uid=?`

      // CODE FOR GETTING COUNTS and if user liked
      SELECT content.id,content.userID,content.imageFilepathArray,
      content.contentText,content.location,content.timestamp,
      content.audioFilepath,content.sheetMusicFilepath,content.contentType,
      content.websiteLink,content.contentType,content.contentName,
      content.mapsEnabled,content.collaborators,content.description,
      content.fromDate,content.toDate,content.isDateCurrent,
      content.price,content.audioFilename,content.sheetMusicFilename,
      content.imageFilepath,content.imageFilename,content.isFeaturedSong,
      user.username,userProfile.displayName,userProfile.profilePicPath,
      COUNT(likes.id) AS likeCount,COUNT(CASE WHEN likes.contentID = content.id AND likes.uid = user.uid THEN 1 ELSE NULL END) AS isLikedByLoggedInUser
      FROM compTodayDBv4.content
      INNER JOIN compTodayDBv4.user ON content.userID=user.id
      INNER JOIN compTodayDBv4.userProfile 
      ON content.userID=userProfile.userID 
      LEFT JOIN compTodayDBv4.likes ON likes.contentID=content.id
      WHERE content.contentType='music' AND user.uid='CXAnyjcCKENusKVEHu36BSMFKds2'
      GROUP BY id;
  
  */

  var error = "";
  var results = [];
  var responseCode = 0;
  // get profilepicpath and username
  const { contentType, uid } = req.body;

  var insertString = `SELECT DISTINCT content.id,user.uid,content.imageFilepathArray,
  content.contentText,content.location,content.timestamp,
  content.audioFilepath,content.sheetMusicFilepath,content.contentType,
  content.websiteLink,content.contentType,content.contentName,
  content.mapsEnabled,content.collaborators,content.description,
  content.fromDate,content.toDate,content.isDateCurrent,
  content.price,content.audioFilename,content.sheetMusicFilename,
  content.imageFilepath,content.imageFilename,content.isFeaturedSong,
  user.username,userProfile.displayName,userProfile.profilePicPath,
  COUNT(likes.id) AS likeCount, SUM(CASE WHEN likes.contentID = content.id AND likes.uid = ? THEN true ELSE false END) AS isLikedByLoggedInUser
  FROM content
  INNER JOIN user ON content.userID=user.id
  INNER JOIN userProfile 
  ON content.userID=userProfile.userID 
  LEFT JOIN likes ON likes.contentID=content.id
  WHERE content.contentType=? AND user.uid=?
  GROUP BY content.id `;

  if (contentType == "experience") {
    insertString += "ORDER BY isDateCurrent, toDate, fromDate DESC;";
  } else {
    insertString += "ORDER BY timestamp DESC;";
  }

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      insertString,
      [uid, contentType, uid],
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
        // package data
        var ret = {
          result: results,
          error: error,
        };
        // send data
        res.status(responseCode).json(ret);
        connection.release();
      }
    );
  });
};
