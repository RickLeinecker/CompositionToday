// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// deleteSpecializationTag
exports.deleteSpecializationTag = async (req, res) => {
  // incoming: specializationTagID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { specializationTagID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "DELETE FROM specializationTag WHERE id=?",
      [specializationTagID],
      function (err, result) {
        if (err) {
          error = "SQL Delete Error";
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results = "Success";
          } else {
            error = "Specialization with this tag does not exist";
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
