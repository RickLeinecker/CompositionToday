// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getLikes
exports.getLikes = async (req, res) => {
  // incoming: nothing
  // outgoing: likes, error

  var error = "";
  var results = "";
  var responseCode = 0;
  mysql_pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM like", function (err, result) {
      if (err) {
        error = "SQL Search Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result[0]) {
          results = result;
          responseCode = 200;
        } else {
          error = "No likes exist";
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
    });
  });
};
