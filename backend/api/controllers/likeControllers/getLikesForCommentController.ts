// gets all of the likes for a comment

// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getLikesForComment
exports.getLikesForComment = async (req, res) => {
  // incoming: commentID
  // outgoing: likes, error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { commentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM likes WHERE commentID=?",
      [commentID],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          // console.log(err);
        } else {
          if (result[0]) {
            results = result;
            responseCode = 200;
          } else {
            error = "This like does not exist";
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
  });
};
