// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateLikeType
exports.updateLikeType = async (req, res) => {
  // incoming: likeType, likeTypeID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { likeType, likeTypeID } = req.body;

  var sqlInsert = "UPDATE likeType SET likeType=? WHERE id=?";
  mysql_pool.getConnection(function (err, connection) {
    connection.query(sqlInsert, [likeType, likeTypeID], function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        // console.log(err);
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
    });
  });
};
