// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateContent
exports.updateContent = async (req, res) => {
  // incoming: userID, contentID, imageFilePathArray, contentText, location, timestamp, audioFilepath, sheetMusicFilepath, contentType, contentName, websiteLink, collaborators
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const {
    userID,
    imageFilepathArray,
    contentText,
    location,
    timestamp,
    audioFilepath,
    sheetMusicFilepath,
    contentType,
    contentName,
    websiteLink,
    contentID,
    collaborators,
  } = req.body;

  var sqlInsert =
    "UPDATE content SET userID=?,imageFilepathArray=?,contentText=?,location=?,timestamp=?,audioFilePath=?,sheetMusicFilePath=?,contentType=?,contentName=?,websiteLink=?,collaborators=? WHERE id=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      sqlInsert,
      [
        userID,
        imageFilepathArray,
        contentText,
        location,
        timestamp,
        audioFilepath,
        sheetMusicFilepath,
        contentType,
        contentName,
        websiteLink,
        collaborators,
        contentID,
      ],
      function (err, result) {
        if (err) {
          error = "SQL Update Error";
          responseCode = 500;
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results.push("Success");
            responseCode = 200;
          } else {
            error = "Content does not exist";
            responseCode = 500;
          }
          // console.log(result);
        }
        // package data
        var ret = {
          result: results,
          error: error,
        };
        // send data
        res.status(responseCode).json(ret);
      }
    );
  });
};
