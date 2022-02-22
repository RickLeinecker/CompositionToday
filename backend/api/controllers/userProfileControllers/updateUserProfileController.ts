// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateUserProfile
exports.updateUserProfile = async (req, res) => {
  // incoming: userID, bio, location, privacySetting, profilePicPath, displayName, userProfileID
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const {
    bio,
    location,
    privacySetting,
    profilePicPath,
    displayName,
    websiteLink,
    userProfileID,
    userID,
  } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE userProfile SET ";
  if (bio !== null) {
    insertString += "bio=?,";
    insertArray.push(bio);
  }

  if (location !== null) {
    insertString += "location=?,";
    insertArray.push(location);
  }

  if (privacySetting !== null) {
    insertString += "privacySetting=?,";
    insertArray.push(privacySetting);
  }

  if (profilePicPath !== null) {
    insertString += "profilePicPath=?,";
    insertArray.push(profilePicPath);
  }

  if (displayName !== null) {
    insertString += "displayName=?,";
    insertArray.push(displayName);
  }

  if (websiteLink !== null) {
    insertString += "websiteLink=?,";
    insertArray.push(websiteLink);
  }

  if (userProfileID !== null) {
    insertString += "userProfileID=?,";
    insertArray.push(userProfileID);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE userID=?";
  insertArray.push(userID);

  // var sqlInsert =
  //   "UPDATE userProfile SET bio=?,location=?,privacySetting=?,profilePicPath=?,displayName=?,websiteLink=?,userProfileID=? WHERE userID=?";
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
          error = "User Profile does not exist";
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
