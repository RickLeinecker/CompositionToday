// mysql connection
var { connection } = require("../../../database/database.ts");

// updateContent
exports.updateContent = async (req, res) => {
  // incoming: userId, image, contentText, genre, location, timestamp, likes, audioFilePath, sheetMusicFilePath, contentTypeId, contentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    userId,
    imageFilepathArray,
    contentText,
    location,
    timestamp,
    likes,
    audioFilepath,
    sheetMusicFilepath,
    contentType,
    contentTags,
    contentID,
  } = req.body;

  var sqlInsert =
    "UPDATE content SET userId=?,imageFilepathArray=?,contentText=?,location=?,timestamp=?,likes=?,audioFilePath=?,sheetMusicFilePath=?,contentType=?,contentTags=? WHERE id=?";

  connection.query(
    sqlInsert,
    [
      userId,
      imageFilepathArray,
      contentText,
      location,
      timestamp,
      likes,
      audioFilepath,
      sheetMusicFilepath,
      contentType,
      contentTags,
      contentID,
    ],
    function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
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
};
