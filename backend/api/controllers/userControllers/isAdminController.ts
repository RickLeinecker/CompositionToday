// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// isAdmin - read user from database
exports.isAdmin = async (req, res) => {
  // incoming: uid
  // outgoing: isAdmin boolean

  // declaring variables for errors and results
  var error = "";
  var results;
  var responseCode = 0;
  // reading data from frontend
  const { uid } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    // query database, handle errors, return JSON
    connection.query(
      "SELECT * FROM user WHERE uid=?",
      [uid],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            results = result[0].isAdmin === 0 ? false : true;
            responseCode = 200;
          } else {
            error = "User does not exist";
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
