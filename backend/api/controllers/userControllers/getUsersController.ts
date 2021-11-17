// mysql connection
var { connection } = require("../../../database/database.ts");

// getUsers - gets all users from the database
exports.getUsers = async (req, res) => {
  // incoming: nothing
  // outgoing: users, error

  // declaring variables for errors and results
  var error = "";
  var results = "";
  var responseCode = 0;

  // query database, handle errors, return JSON
  connection.query("SELECT * FROM user", function (err, result) {
    if (err) {
      error = "SQL Search Error";
      responseCode = 500;
      console.log(err);
    } else {
      if (result[0]) {
        results = result;
        responseCode = 200;
      } else {
        error = "No Users";
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
  });
};
