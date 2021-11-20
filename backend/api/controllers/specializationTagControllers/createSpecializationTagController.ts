// mysql connection
var { connection } = require("../../../database/database.ts");

// createSpecializationTag
exports.createSpecializationTag = async (req, res) => {
  // incoming: userID, tagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userID, tagID } = req.body;

  const sqlInsert = "INSERT INTO contentGenre(userID, tagID) VALUES (?,?)";
  connection.query(sqlInsert, [userID, tagID], function (err, result) {
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
