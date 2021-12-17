// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createLikeType
exports.createLikeType = async (req, res) => {
  // incoming: likeType
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { likeType } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert = "INSERT INTO likeType(likeType) VALUES (?)";
    connection.query(sqlInsert, [likeType], function (err, result) {
      if (err) {
        error = "SQL Insert Error";
        responseCode = 500;
        // console.log(err);
      } else {
        results.push("Success");
        responseCode = 201;
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
