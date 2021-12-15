// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getSpecializationTagsForUser
exports.getSpecializationTagsForUser = async (req, res) => {
  // incoming: userID
  // outgoing: content, error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userID } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM specializationTag WHERE userID=?",
      [userID],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          // console.log(err);
        } else {
          if (result[0]) {
            results = result[0];
            responseCode = 200;
          } else {
            error = "Specialization with this tag does not exist";
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
      }
    );
  });
};
