// mysql connection
var { connection } = require("../../../database/database.ts");

// createGenre
exports.createContentGenre = async (req, res) => {
  // incoming: contentID, genre
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, genre } = req.body;

  const sqlInsert = "INSERT INTO contentGenre(contentID, genre) VALUES (?,?)";
  connection.query(sqlInsert, [contentID, genre], function (err, result) {
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
  });
};
