// mysql connection
var { connection } = require("../../../database/database.ts");

// updateUserProfile
exports.updateUserProfile = async (req, res) => {
  // incoming: userId, bio, specialization, location, privacySetting, content, profilePicPath, connections, displayName, userProfileID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    userId,
    bio,
    specialization,
    location,
    privacySetting,
    content,
    profilePicPath,
    connections,
    displayName,
    userProfileID,
  } = req.body;

  var sqlInsert =
    "UPDATE userProfile SET userId=?,bio=?,specialization=?,location=?,privacySetting=?,content=?,profilePicPath=?,connections=?,displayName=? WHERE id=?";

  connection.query(
    sqlInsert,
    [
      userId,
      bio,
      specialization,
      location,
      privacySetting,
      content,
      profilePicPath,
      connections,
      displayName,
      userProfileID,
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
};
