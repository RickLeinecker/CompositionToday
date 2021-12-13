// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getSpecializationTags
exports.getSpecializationTags = async (req, res) => {
  // incoming: nothing
  // outgoing: tags, error

  var error = "";
  var results = "";
  var responseCode = 0;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM specializationTags",
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
            error = "Specialization with this tag does not exist";
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
