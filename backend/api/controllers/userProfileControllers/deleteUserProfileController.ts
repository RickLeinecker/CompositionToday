// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// deleteUserProfile
exports.deleteUserProfile = async (req, res) => {
  // incoming: userProfileID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { userProfileID } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "DELETE FROM userProfile WHERE id=?",
      [userProfileID],
      function (err, result) {
        if (err) {
          error = "SQL Delete Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results.push("Success");
            responseCode = 200;
          } else {
            error = "User Profile does not exist";
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
        connection.release();
      }
    );
  });
};
