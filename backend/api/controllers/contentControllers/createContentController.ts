// mysql connection
var { connection } = require("../../../database/database.ts");

// createContent
exports.createContent = async (req, res) => {
  // incoming: userId, image, contentText, location, timestamp, likes, audioFilepath, sheetMusicFilepath, contentTypeId, contentTags
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
  } = req.body;

  const sqlInsert =
    "INSERT INTO content(userId,imageFilepathArray,contentText,location,timestamp,likes,audioFilepath,sheetMusicFilepath,contentType,contentTags) VALUES (?,?,?,?,?,?,?,?,?,?)";
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
};
