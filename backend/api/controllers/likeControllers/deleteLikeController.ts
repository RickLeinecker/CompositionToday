// mysql connection
var { connection } = require("../../../database/database.ts");

// deleteLike
exports.deleteLike = async (req, res) => {
  // incoming: likeID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { likeID } = req.body;

  connection.query(
    "DELETE FROM like WHERE id=?",
    [likeID],
    function (err, result) {
      if (err) {
        error = "SQL Delete Error";
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
        } else {
          error = "Like does not exist";
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