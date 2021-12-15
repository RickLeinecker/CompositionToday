// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// deleteContentTag
exports.deleteContentTag = async (req, res) => {
  // incoming: contentTagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentTagID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "DELETE FROM contentTag WHERE id=?",
      [contentTagID],
      function (err, result) {
        if (err) {
          error = "SQL Delete Error";
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results = "Success";
          } else {
            error = "Content with this tag does not exist";
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
