// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createLike
exports.createLike = async (req, res) => {
  // incoming: uid, timestamp, likeTypeID, commentID, contentID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { uid, timestamp, likeTypeID, commentID, contentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO likes(uid, timestamp, likeTypeID, commentID, contentID) VALUES (?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [uid, timestamp, likeTypeID, commentID, contentID],
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
