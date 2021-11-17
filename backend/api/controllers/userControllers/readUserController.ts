// mysql connection
var { connection } = require("../../../database/database.ts");

// readUser - read user from database
exports.readUser = async (req, res) => {
  // incoming: userID
  // outgoing: user or error

  // declaring variables for errors and results
  var error = "";
  var results = "";
  var responseCode = 0;
  // reading data from frontend
  const { userID } = req.body;

  // query database, handle errors, return JSON
  connection.query(
    "SELECT * FROM user WHERE id=?",
    [userID],
    function (err, result) {
      if (err) {
        error = "SQL Search Error";
        responseCode = 500;
        // console.log(err);
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
    }
  );
};
