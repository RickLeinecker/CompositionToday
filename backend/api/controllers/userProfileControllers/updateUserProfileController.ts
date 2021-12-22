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
  if (bio) {
    insertString += "bio=?,";
    insertArray.push(bio);
  }

  if (location) {
    insertString += "location=?,";
    insertArray.push(location);
  }

  if (privacySetting) {
    insertString += "privacySetting=?,";
    insertArray.push(privacySetting);
  }

  if (profilePicPath) {
    insertString += "profilePicPath=?,";
    insertArray.push(profilePicPath);
  }

  if (displayName) {
    insertString += "displayName=?,";
    insertArray.push(displayName);
  }

  if (websiteLink) {
    insertString += "websiteLink=?,";
    insertArray.push(websiteLink);
  }

  if (userProfileID) {
    insertString += "userProfileID=?,";
    insertArray.push(userProfileID);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
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
