// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// removeGenre
exports.removeGenre = async (req, res) => {
  // incoming: tagID
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const { tagID } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE tag SET ";

  insertString += "approvedGenre=0,";

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(tagID);

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
      connection.release();
    });
  });
};
