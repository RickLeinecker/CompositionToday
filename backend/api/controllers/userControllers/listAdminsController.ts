// mysql connection

var { mysql_pool } = require("../../../database/database.ts");

// listAdmins - gets all admins from the database
exports.listAdmins = async (req, res) => {
  // incoming: nothing
  // outgoing: users, error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM user WHERE isAdmin=1",
      function (err, result) {
        if (err) {
          error = err;
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            results = result;
            responseCode = 200;
          } else {
            error = "No Admins";
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
      }
    );
  });
};
