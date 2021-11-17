// mysql connection
var { connection } = require("../../../database/database.ts");

// getContentByType
exports.getContentByType = async (req, res) => {
  // incoming: contentType
  // outgoing: content, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentType } = req.body;

  connection.query(
    "SELECT * FROM content WHERE contentType=?",
    [contentType],
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
          error = "Content does not exist";
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
