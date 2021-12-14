// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// readLike
exports.readLike = async (req, res) => {
  // incoming: likeID
  // outgoing: like, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { likeID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM likes WHERE id=?",
      [likeID],
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
