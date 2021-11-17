// mysql connection
var { connection } = require("../../../database/database.ts");

// readContent
exports.readContent = async (req, res) => {
  // incoming: contentID
  // outgoing: content, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID } = req.body;

  connection.query(
    "SELECT * FROM content WHERE id=?",
    [contentID],
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
