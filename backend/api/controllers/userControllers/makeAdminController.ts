// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// makeAdmin - makes a user an admin
exports.makeAdmin = async (req, res) => {
  // incoming: uid
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;
  var isAdmin = 1;
  // reading data from frontend
  var { uid } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE user SET isAdmin=? WHERE uid=?;";
  insertArray.push(isAdmin);
  insertArray.push(uid);

  mysql_pool.getConnection(function (err, connection) {
    connection.query(insertString, insertArray, function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results.push("Success");
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
    });
  });
};
