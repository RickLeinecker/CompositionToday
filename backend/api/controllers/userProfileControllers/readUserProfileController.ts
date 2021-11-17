// mysql connection
var { connection } = require("../../../database/database.ts");

// readUserProfile
exports.readUserProfile = async (req, res) => {
  // incoming: userProfileID
  // outgoing: content, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userProfileID } = req.body;

  connection.query(
    "SELECT * FROM userProfile WHERE id=?",
    [userProfileID],
    function (err, result) {
      if (err) {
        error = "SQL Search Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result[0]) {
          results = result[0];
          responseCode = 200;
        } else {
          error = "User Profile does not exist";
          responseCode = 500;
        }
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
