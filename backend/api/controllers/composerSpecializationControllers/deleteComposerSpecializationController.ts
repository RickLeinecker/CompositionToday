// mysql connection
var { connection } = require("../../../database/database.ts");

// deleteComposerSpecialization
exports.deleteComposerSpecialization = async (req, res) => {
  // incoming: userProfileID, specialization
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userProfileID, specialization } = req.body;

  connection.query(
    "DELETE FROM composerSpecialization WHERE contentID=? AND genre=?",
    [userProfileID, specialization],
    function (err, result) {
      if (err) {
        error = "SQL Delete Error";
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
        } else {
          error = "Content with this genre does not exist";
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
