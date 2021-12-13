// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// deleteUser - delete a user from database
exports.deleteUser = async (req, res) => {
  // incoming: userID
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = "";
  var responseCode = 0;
  // reading data from frontend
  const { userID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    // query database, handle errors, return JSON
    connection.query(
      "DELETE FROM user WHERE id=?",
      [userID],
      function (err, result) {
        if (err) {
          error = "SQL Delete Error";
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results = "Success";
          } else {
            error = "User does not exist";
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
