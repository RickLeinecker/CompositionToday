// mysql connection
var { connection } = require("../../../database/database.ts");

// createComposerSpecialization
exports.createComposerSpecialization = async (req, res) => {
  // incoming: userProfileID, specialization
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userProfileID, specialization } = req.body;

  const sqlInsert =
    "INSERT INTO composerSpecialization(userProfileID,specialization) VALUES (?,?)";
  connection.query(
    sqlInsert,
    [userProfileID, specialization],
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