// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createContentTag
exports.createContentTag = async (req, res) => {
  // incoming: contentID, tagID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { contentID, tagID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert = "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)";
    connection.query(sqlInsert, [contentID, tagID], function (err, result) {
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
