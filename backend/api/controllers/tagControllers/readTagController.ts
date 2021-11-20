// mysql connection
var { connection } = require("../../../database/database.ts");

// readTag
exports.readTag = async (req, res) => {
  // incoming: tagID
  // outgoing: tag, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { tagID } = req.body;

  connection.query(
    "SELECT * FROM tag WHERE id=?",
    [tagID],
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
          error = "This tag does not exist";
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