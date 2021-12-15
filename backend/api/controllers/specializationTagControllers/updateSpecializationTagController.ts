// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateSpecializationTag
exports.updateSpecializationTag = async (req, res) => {
  // incoming: userID, tagID, specializationTagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userID, tagID, specializationTagID } = req.body;

  var sqlInsert = "UPDATE specializationTag SET userID=?,tagID=? WHERE id=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      sqlInsert,
      [userID, tagID, specializationTagID],
      function (err, result) {
        if (err) {
          error = "SQL Update Error";
          responseCode = 500;
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results = "Success";
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
      }
    );
  });
};
