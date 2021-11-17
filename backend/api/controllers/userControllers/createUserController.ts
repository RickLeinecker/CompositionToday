// mysql connection
var { connection } = require("../../../database/database.ts");

// createUser - add user to database
exports.createUser = async (req, res) => {
  // incoming: firstName, lastName, username, uid, email, isPublisher
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = "";
  var responseCode = 0;
  // reading data from frontend
  const { firstName, lastName, username, uid, email, isPublisher } = req.body;

  // preparing MySQL string
  var sqlInsert =
    "INSERT INTO user(firstName,lastName,username,uid,email,isPublisher) VALUES(?,?,?,?,?,?,?)";

  // query database, handle errors, return JSON
  connection.query(
    sqlInsert,
    [firstName, lastName, username, uid, email, isPublisher],
    function (err, result) {
      if (err) {
        error = "SQL Insert Error";
        responseCode = 500;
        // console.log(err);
      } else {
        results = "Success";
        responseCode = 201;
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
};
