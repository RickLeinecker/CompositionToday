// mysql connection
var { connection } = require("../../../database/database.ts");

// getComposerSpecialization
exports.getComposerSpecializations = async (req, res) => {
  // incoming: nothing
  // outgoing: genres with contentIDs, error

  var error = "";
  var results = "";
  var responseCode = 0;

  connection.query(
    "SELECT * FROM composerSpecialization",
    function (err, result) {
      if (err) {
        error = "SQL Search Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result[0]) {
          results = result;
          responseCode = 200;
        } else {
          error = "Composer with this specialization does not exist";
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
