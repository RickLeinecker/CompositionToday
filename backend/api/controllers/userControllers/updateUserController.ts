// mysql connection
var { connection } = require("../../../database/database.ts");

// updateUser - update user in database
exports.updateUser = async (req, res) => {
  // incoming: userID, firstName, lastName, username, email, uid, isPublisher
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = "";
  var responseCode = 0;
  // reading data from frontend
  var { userID, firstName, lastName, username, email, uid, isPublisher } =
    req.body;
  if (!firstName) {
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
            firstName = result[0].firstName;
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
        }
      }
    );
  }
  if (!lastName) {
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
            firstName = result[0].lastName;
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
        }
      }
    );
  }
  if (!username) {
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
            firstName = result[0].username;
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
        }
      }
    );
  }
  if (!email) {
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
            firstName = result[0].email;
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
        }
      }
    );
  }
  if (!uid) {
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
            firstName = result[0].uid;
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
        }
      }
    );
  }
  if (!isPublisher) {
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
            firstName = result[0].isPublisher;
            responseCode = 200;
          } else {
            error = "User does not exist";
            responseCode = 500;
          }
        }
      }
    );
  }

  // preparing MySQL string
  var sqlInsert =
    "UPDATE user SET firstName=?,lastName=?,username=?,email=?,uid=?,isPublisher=? WHERE id=?";
  // query database, handle errors, return JSON
  connection.query(
    sqlInsert,
    [firstName, lastName, username, email, uid, isPublisher, userID],
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
};
