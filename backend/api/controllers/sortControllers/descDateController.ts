// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getDescDate
exports.getDescDate = async (req, res) => {
  // incoming: nothing
  // outgoing: content in descending date, error

  var error = "";
  var results = [];
  var responseCode = 0;

  mysql_pool.getConnection(function (err, connection) {
    const sqlGet = "SELECT * FROM content ORDER BY timestamp DESC";
    connection.query(sqlGet, function (err, result) {
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
    });
  });
};
