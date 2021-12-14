// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateUser - update user in database
exports.updateUser = async (req, res) => {
  // incoming: userID, firstName, lastName, username, email, uid, isPublisher
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = "";
  var responseCode = 0;
  // reading data from frontend
  var {
    userID,
    firstName,
    lastName,
    username,
    email,
    uid,
    isPublisher,
    userProfileID,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    // preparing MySQL string
    var sqlInsert =
      "UPDATE user SET firstName=?,lastName=?,username=?,email=?,uid=?,isPublisher=?,userProfileID=? WHERE id=?";
    // query database, handle errors, return JSON
    connection.query(
      sqlInsert,
      [
        firstName,
        lastName,
        username,
        email,
        uid,
        isPublisher,
        userProfileID,
        userID,
      ],
      function (err, result) {
        if (err) {
          error = "SQL Update Error";
          responseCode = 500;
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results = "Success";
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
          // console.log(result);
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
