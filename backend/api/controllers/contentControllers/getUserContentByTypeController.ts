// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getContentByType
exports.getUserContentByType = async (req, res) => {
  // incoming: contentType, userID
  // outgoing: content, error
  /*
      `SELECT content.id,content.userID,content.contentText,
      content.contentName,content.timestamp,content.audioFilepath,
      content.audioFilename,content.sheetMusicFilepath,content.sheetMusicFilename,
      content.description,user.username,userProfile.displayName,userProfile.profilePicPath 
      FROM content INNER JOIN user ON content.userID=user.id INNER JOIN userProfile 
      ON content.userID=userProfile.userID 
      WHERE content.contentType=? AND content.userID=?`
  */
  var error = "";
  var results = [];
  var responseCode = 0;
  // get profilepicpath and username
  const { contentType, userID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT content.id,content.userID,content.imageFilepathArray,
      content.contentText,content.location,content.timestamp,
      content.audioFilepath,content.sheetMusicFilepath,content.contentType,
      content.websiteLink,content.contentType,content.contentName,
      content.mapsEnabled,content.collaborators,content.description,
      content.fromDate,content.toDate,content.isDateCurrent,
      content.price,content.audioFilename,content.sheetMusicFilename,
      content.imageFilepath,content.imageFilename,content.isFeaturedSong,
      user.username,userProfile.displayName,userProfile.profilePicPath 
      FROM content INNER JOIN user ON content.userID=user.id INNER JOIN userProfile 
      ON content.userID=userProfile.userID 
      WHERE content.contentType=? AND content.userID=?`,
      [contentType, userID],
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
