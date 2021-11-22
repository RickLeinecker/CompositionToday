// mysql connection
var { connection } = require("../../../database/database.ts");

// updateTag
exports.updateTag = async (req, res) => {
  // incoming: tagName, tagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { tagName, tagID } = req.body;

  var sqlInsert = "UPDATE tag SET tagName=? WHERE id=?";

  connection.query(sqlInsert, [tagName, tagID], function (err, result) {
    if (err) {
      error = "SQL Update Error";
      responseCode = 500;
      // console.log(err);
    } else {
      if (result.affectedRows > 0) {
        results = "Success";
        responseCode = 200;
      } else {
        error = "This tag does not exist";
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
  });
};
