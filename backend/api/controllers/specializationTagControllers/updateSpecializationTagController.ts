// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateSpecializationTag
exports.updateSpecializationTag = async (req, res) => {
  // incoming: userID, tagID, specializationTagID
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const { userID, tagID, specializationTagID } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE specializationTag SET ";
  if (userID !== null) {
    insertString += "userID=?,";
    insertArray.push(userID);
  }

  if (tagID !== null) {
    insertString += "tagID=?,";
    insertArray.push(tagID);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(specializationTagID);

  // var sqlInsert = "UPDATE specializationTag SET userID=?,tagID=? WHERE id=?";
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
          error = "Specialization with this tag does not exist";
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
