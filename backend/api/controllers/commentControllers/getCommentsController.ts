// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getComments
exports.getComments = async (req, res) => {
  // incoming: nothing
  // outgoing: comments, error

  var error = "";
  var results = [];
  var responseCode = 0;
  mysql_pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM comment", function (err, result) {
      if (err) {
        error = "SQL Search Error";
        responseCode = 500;
        console.log(err);
      } else {
        if (result[0]) {
          results = result;
          responseCode = 200;
        } else {
          error = "No Comments";
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
      connection.release();
    });
  });
};
