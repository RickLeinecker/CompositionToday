// mysql connection
var { connection } = require("../../../database/database.ts");

// createContentTag
exports.createContentTag = async (req, res) => {
  // incoming: contentID, tagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, tagID } = req.body;

  const sqlInsert = "INSERT INTO contentGenre(contentID, tagID) VALUES (?,?)";
  connection.query(sqlInsert, [contentID, tagID], function (err, result) {
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
  });
};
