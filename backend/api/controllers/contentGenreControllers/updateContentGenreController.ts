// mysql connection
var { connection } = require("../../../database/database.ts");

// updateContentGenre
exports.updateContentGenre = async (req, res) => {
  // incoming: contentID, genre, contentGenreID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, genre, contentGenreID } = req.body;

  var sqlInsert = "UPDATE contentGenre SET contentID=?,genre=? WHERE id=?";

  connection.query(
    sqlInsert,
    [contentID, genre, contentGenreID],
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
          error = "Content with this genre does not exist";
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
