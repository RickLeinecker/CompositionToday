// mysql connection
var { mysql_pool } = require("../../database/database.ts");

// validateAPIKey
exports.validateAPIKey = (req, res, next) => {
  // input: key
  // output: api authentication error

  var error = "";
  var results = [];
  var responseCode = 500;
  const developerKey = req.header("X-API-Key");

  mysql_pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      // return with error
      res.status(responseCode).json({
        result: results,
        error: "Unauthorized: API Authentication Error",
      });
    } else {
      connection.query(
        "SELECT * FROM developers WHERE developerKey=?",
        [developerKey],
        function (err, result) {
          if (err) {
            error = "Unauthorized: API Authentication Error";
            responseCode = 401;
            console.log(err);
            sendData();
          } else {
            if (result[0]) {
              next();
            } else {
              error = "Unauthorized: API Authentication Error";
              responseCode = 401;
              sendData();
            }
          }
          function sendData() {
            // package data
            var ret = {
              result: results,
              error: error,
            };
            // send data
            res.status(responseCode).json(ret);
          }
          connection.release();
        }
      );
    }
  });
};
