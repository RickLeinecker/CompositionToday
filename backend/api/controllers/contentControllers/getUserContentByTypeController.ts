// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getContentByType
exports.getUserContentByType = async (req, res) => {
  // incoming: contentType, userID
  // outgoing: content, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentType, userID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM content WHERE contentType=? AND userId=?",
      [contentType, userID],
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
            error = "Content does not exist";
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