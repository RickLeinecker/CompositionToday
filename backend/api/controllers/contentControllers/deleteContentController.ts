// mysql connection
var { connection } = require("../../../database/database.ts");

// deleteContent
exports.deleteContent = async (req, res) => {
  // incoming: contentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID } = req.body;

  connection.query(
    "DELETE FROM content WHERE id=?",
    [contentID],
    function (err, result) {
      if (err) {
        error = "SQL Delete Error";
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
        } else {
          error = "Content does not exist";
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
