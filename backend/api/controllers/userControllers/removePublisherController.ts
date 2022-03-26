// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// removePublisher - update the status of user in the database to not a publisher
exports.removePublisher = async (req, res) => {
  // incoming: uid
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;
  // reading data from frontend
  var { uid } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE user SET isPublisher=0";
  insertString += " WHERE uid=?";
  insertArray.push(uid);

  mysql_pool.getConnection(function (err, connection) {
    // preparing MySQL string
    // query database, handle errors, return JSON
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
