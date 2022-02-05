// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getUserProfile
exports.getUserProfile = async (req, res) => {
  // incoming: username
  // outgoing: content, error

  var error = "";
  var results = [];
  var responseCode = 0;
  var userID = -1;

  const { username } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    // get user by uid
    connection.query(
      "SELECT * FROM user WHERE username=?",
      [username],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            // results = result[0];
            userID = result[0].id;
            console.log("UserID izz: " + userID);
            console.log("UserID is: " + userID);
            // get user profile
            connection.query(
              "SELECT * FROM userProfile WHERE userID=?",
              [userID],
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
                    error = "User Profile does not exist";
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
          } else {
            error = "User does not exist";
            responseCode = 500;
            // package data
            var ret = {
              result: results,
              error: error,
            };
            // send error data
            res.status(responseCode).json(ret);
            // release db connection
            connection.release();
          }
        }
      }
    );
  });
};
