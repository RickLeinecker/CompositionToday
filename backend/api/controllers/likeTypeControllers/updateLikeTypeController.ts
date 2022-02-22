// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateLikeType
exports.updateLikeType = async (req, res) => {
  // incoming: likeType, likeTypeID
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const { likeType, likeTypeID } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE likeType SET ";
  if (likeType != null) {
    insertString += "likeType=?,";
    insertArray.push(likeType);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(likeTypeID);

  var sqlInsert = "UPDATE likeType SET likeType=? WHERE id=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(insertString, insertArray, function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results.push("Success");
          responseCode = 200;
        } else {
          error = "Like type does not exist";
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
      connection.release();
    });
  });
};
