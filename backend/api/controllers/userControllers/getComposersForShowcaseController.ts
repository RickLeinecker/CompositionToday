// mysql connection

var { mysql_pool } = require("../../../database/database.ts");

// getComposersForShowcase - gets all users from the database
exports.getComposersForShowcase = async (req, res) => {
  // incoming: nothing
  // outgoing: users, error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT user.id,user.firstName,user.lastName FROM user WHERE isPublisher=0",
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
            error = "No Composers Found";
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

  // query database, handle errors, return JSON
};
