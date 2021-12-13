// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateLike
exports.updateLike = async (req, res) => {
  // incoming: likeID, userID, timestamp, likeTypeID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { likeID, userID, timestamp, likeTypeID } = req.body;

  var sqlInsert =
    "UPDATE like SET userID=?,timestamp=?,likeTypeID=? WHERE id=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      sqlInsert,
      [userID, timestamp, likeTypeID, likeID],
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
            error = "Like does not exist";
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
