// mysql connection
var { connection } = require("../../../database/database.ts");

// approveComment
exports.approveComment = async (req, res) => {
  // incoming: approved, commentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { approved, commentID } = req.body;
  var sqlInsert = "UPDATE comments SET approved=? WHERE id=?";

  connection.query(sqlInsert, [approved, commentID], function (err, result) {
    if (err) {
      error = "SQL Update Error";
      responseCode = 500;
      // console.log(err);
    } else {
      if (result.affectedRows > 0) {
        results = "Success";
        responseCode = 200;
      } else {
        error = "Comment does not exist";
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
