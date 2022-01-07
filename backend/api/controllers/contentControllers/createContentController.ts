// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createContent
exports.createContent = async (req, res) => {
  // incoming: userID, imageFilepathArray, contentText, location, timestamp, audioFilepath, sheetMusicFilepath, contentType, contentName, websiteLink, collaborators, description, mapsEnabled
  // outgoing: error

  var error = "";
  var results = [];
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
    collaborators,
    description,
    mapsEnabled,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO content(userID,imageFilepathArray,contentName,contentText,location,timestamp,audioFilepath,sheetMusicFilepath,contentType,websiteLink,collaborators,description,mapsEnabled) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        collaborators,
        description,
        mapsEnabled,
      ],
      function (err, result) {
        if (err) {
          error = err;
          responseCode = 500;
          console.log(err);
        } else {
          results.push("Success");
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
        connection.release();
      }
    );
  });
};
