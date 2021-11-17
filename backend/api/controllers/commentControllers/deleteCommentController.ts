// mysql connection
var { connection } = require("../../../database/database.ts");

// deleteComment
exports.deleteComment = async (req, res) => {
  // incoming: commentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { commentID } = req.body;

  connection.query(
    "DELETE FROM comments WHERE id=?",
    [commentID],
    function (err, result) {
      if (err) {
        error = "SQL Delete Error";
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
        } else {
          error = "Comment does not exist";
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
