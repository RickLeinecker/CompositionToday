// mysql connection
var { connection } = require("../../../database/database.ts");

// readComment
exports.readComment = async (req, res) => {
  // incoming: commentID
  // outgoing: comment, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { commentID } = req.body;

  connection.query(
    "SELECT * FROM comments WHERE id=?",
    [commentID],
    function (err, result) {
      if (err) {
        error = "SQL Search Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result[0]) {
          results = result[0];
          responseCode = 200;
        } else {
          error = "Comment does not exist";
          responseCode = 500;
        }
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
