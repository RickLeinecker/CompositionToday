// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateUserProfile
exports.updateUserProfile = async (req, res) => {
  // incoming: userID, bio, location, privacySetting, profilePicPath, displayName, userProfileID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    bio,
    location,
    privacySetting,
    profilePicPath,
    displayName,
    websiteLink,
    userID,
  } = req.body;

  var sqlInsert =
    "UPDATE userProfile SET bio=?,location=?,privacySetting=?,profilePicPath=?,displayName=?,websiteLink=? WHERE userID=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      sqlInsert,
      [
        bio,
        location,
        privacySetting,
        profilePicPath,
        displayName,
        websiteLink,
        userID,
      ],
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
      }
    );
  });
};
