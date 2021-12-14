// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createContent
exports.createContent = async (req, res) => {
  // incoming: userID, imageFilePathArray, contentText, location, timestamp, audioFilepath, sheetMusicFilepath, contentType, contentName, websiteLink
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    userID,
    imageFilepathArray,
    contentName,
    contentText,
    location,
    timestamp,
    audioFilepath,
    sheetMusicFilepath,
    contentType,
    websiteLink,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO content(userID,imageFilepathArray,contentName,contentText,location,timestamp,audioFilepath,sheetMusicFilepath,contentType,websiteLink) VALUES (?,?,?,?,?,?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [
        userID,
        imageFilepathArray,
        contentName,
        contentText,
        location,
        timestamp,
        audioFilepath,
        sheetMusicFilepath,
        contentType,
        websiteLink,
      ],
      function (err, result) {
        if (err) {
          error = "SQL Insert Error";
          responseCode = 500;
          // console.log(err);
        } else {
          results = "Success";
          responseCode = 201;
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
