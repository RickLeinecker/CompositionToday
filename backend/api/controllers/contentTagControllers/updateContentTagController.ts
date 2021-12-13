// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateContentTag
exports.updateContentTag = async (req, res) => {
  // incoming: contentID, tagID, contentTagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, tagID, contentTagID } = req.body;

  var sqlInsert = "UPDATE contentTag SET contentID=?,tagID=? WHERE id=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      sqlInsert,
      [contentID, tagID, contentTagID],
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
            error = "Content with this tag does not exist";
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
