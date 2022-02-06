// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createTag
exports.createTag = async (req, res) => {
  // incoming: tagName
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { tagName } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert = "INSERT INTO tag(tagName) VALUES (?)";
    connection.query(sqlInsert, [tagName], function (err, result) {
      if (err) {
        error = "SQL Insert Error";
        responseCode = 500;
        console.log(err);
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
      connection.release();
    });
  });
};
