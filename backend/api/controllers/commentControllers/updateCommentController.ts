// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateComment
exports.updateComment = async (req, res) => {
  // incoming: contentID, commenterUserID, timestamp, comment, approved, commentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    contentID,
    commenterUserID,
    timestamp,
    comment,
    approved,
    commentID,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    var sqlInsert =
      "UPDATE comment SET contentID=?,commenterUserID=?,timestamp=?,comment=?,approved=? WHERE id=?";

    connection.query(
      sqlInsert,
      [contentID, commenterUserID, timestamp, comment, approved, commentID],
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
            error = "Comment does not exist";
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
