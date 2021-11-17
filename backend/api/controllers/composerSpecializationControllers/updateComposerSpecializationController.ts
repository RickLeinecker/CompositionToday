// mysql connection
var { connection } = require("../../../database/database.ts");

// updateComposerSpecialization
exports.updateComposerSpecialization = async (req, res) => {
  // incoming: userProfileID, specialization, composerSpecializationID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userProfileID, specialization, composerSpecializationID } = req.body;

  var sqlInsert =
    "UPDATE composerSpecialization SET userProfileID=?,specialization=? WHERE id=?";

  connection.query(
    sqlInsert,
    [userProfileID, specialization, composerSpecializationID],
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
          error = "Composer with this specialization does not exist";
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
