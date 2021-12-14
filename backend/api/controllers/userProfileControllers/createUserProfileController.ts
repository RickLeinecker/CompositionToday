// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createUserProfile
exports.createUserProfile = async (req, res) => {
  // incoming: userID, bio, location, privacySetting, profilePicPath, displayName, websiteLink
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    userID,
    bio,
    location,
    privacySetting,
    profilePicPath,
    displayName,
    websiteLink,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO userProfile(userID,bio,location,privacySetting,profilePicPath,displayName,websiteLink) VALUES (?,?,?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [
        userID,
        bio,
        location,
        privacySetting,
        profilePicPath,
        displayName,
        websiteLink,
      ],
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
  });
};
