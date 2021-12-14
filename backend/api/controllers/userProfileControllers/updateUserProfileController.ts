// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateUserProfile
exports.updateUserProfile = async (req, res) => {
  // incoming: userId, bio, specialization, location, privacySetting, content, profilePicPath, connections, displayName, userProfileID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    bio,
    specializationTags,
    location,
    privacySetting,
    contents,
    profilePicPath,
    connections,
    displayName,
    websiteLink,
    userID,
  } = req.body;

  var sqlInsert =
    "UPDATE userProfile SET bio=?,specializationTags=?,location=?,privacySetting=?,contents=?,profilePicPath=?,connections=?,displayName=?,websiteLink=? WHERE userId=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      sqlInsert,
      [
        bio,
        specializationTags,
        location,
        privacySetting,
        contents,
        profilePicPath,
        connections,
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
