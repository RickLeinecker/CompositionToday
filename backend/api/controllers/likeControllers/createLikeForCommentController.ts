// creates a like for a comment

// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createLikeForComment
exports.createLikeForComment = async (req, res) => {
  // incoming: uid, timestamp, likeTypeID, commentID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { uid, timestamp, likeTypeID, commentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO likes(uid, timestamp, likeTypeID, commentID) VALUES (?,?,?,?)";
    connection.query(
      sqlInsert,
      [uid, timestamp, likeTypeID, commentID],
      function (err, result) {
        if (err) {
          error = "SQL Insert Error";
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
