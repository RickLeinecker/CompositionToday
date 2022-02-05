// mysql connection
var { connection } = require("../../../database/database.ts");

// createContent
exports.createContent = async (req, res) => {
  // incoming: userId, image, contentText, genre, location, timestamp, likes, audioFilePath, sheetMusicFilePath, contentTypeId
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    userId,
    image,
    contentText,
    genre,
    location,
    timestamp,
    likes,
    audioFilePath,
    sheetMusicFilePath,
    contentTypeId,
  } = req.body;

  const sqlInsert =
    "INSERT INTO content(userId,image,contentText,genre,location,timestamp,likes,audioFilePath,sheetMusicFilePath,contentTypeId) VALUES (?,?,?,?,?,?,?,?,?,?)";
  connection.query(
    sqlInsert,
    [
      userId,
      image,
      contentText,
      genre,
      location,
      timestamp,
      likes,
      audioFilePath,
      sheetMusicFilePath,
      contentTypeId,
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
