// mysql connection
var { connection } = require("../../../database/database.ts");

// createUserProfile
exports.createUserProfile = async (req, res) => {
  // incoming: userId, bio, specialization, location, privacySetting, content, profilePicPath, connections, displayName
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
  } = req.body;

  const sqlInsert =
    "INSERT INTO userProfile(userId,bio,specialization,location,privacySetting,content,profilePicPath,connections,displayName) VALUES (?,?,?,?,?,?,?,?,?)";
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
};
