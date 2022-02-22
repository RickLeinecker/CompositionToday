// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateUser - update user in database
exports.updateUser = async (req, res) => {
  // incoming: userID, firstName, lastName, username, email, uid, isPublisher
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var insertArray = [];
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

  // build update string with non null fields
  var insertString = "UPDATE user SET ";
  if (firstName !== null) {
    insertString += "firstName=?,";
    insertArray.push(firstName);
  }

  if (lastName !== null) {
    insertString += "lastName=?,";
    insertArray.push(lastName);
  }

  if (username !== null) {
    insertString += "username=?,";
    insertArray.push(username);
  }

  if (email !== null) {
    insertString += "email=?,";
    insertArray.push(email);
  }

  if (uid !== null) {
    insertString += "uid=?,";
    insertArray.push(uid);
  }

  if (isPublisher !== null) {
    insertString += "isPublisher=?,";
    insertArray.push(isPublisher);
  }

  if (userProfileID !== null) {
    insertString += "userProfileID=?,";
    insertArray.push(userProfileID);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(userID);

  mysql_pool.getConnection(function (err, connection) {
    // preparing MySQL string
    // var sqlInsert =
    //   "UPDATE user SET firstName=?,lastName=?,username=?,email=?,uid=?,isPublisher=?,userProfileID=? WHERE id=?";
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
    });
  });
};
