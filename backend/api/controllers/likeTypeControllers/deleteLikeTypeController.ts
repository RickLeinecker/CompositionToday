// mysql connection
var { connection } = require("../../../database/database.ts");

// deleteLikeType
exports.deleteLike = async (req, res) => {
  // incoming: likeTypeID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { likeTypeID } = req.body;

  connection.query(
    "DELETE FROM likeType WHERE id=?",
    [likeTypeID],
    function (err, result) {
      if (err) {
        error = "SQL Delete Error";
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
        } else {
          error = "Like type does not exist";
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
