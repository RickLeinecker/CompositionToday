// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// readUserByUsername - read user and user profile from database
exports.readUserByUsername = async (req, res) => {
  // incoming: username
  // outgoing: user or error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;
  // reading data from frontend
  const { username } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    // query database, handle errors, return JSON
    connection.query(
      "SELECT * FROM user INNER JOIN userProfile ON user.userProfileID=userProfile.id AND user.username=?",
      [username],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            results = result[0];
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
