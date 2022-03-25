// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createTag
exports.createTag = async (req, res) => {
  // incoming: tagName, imageFilepath, imageFilename
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { tagName, imageFilepath, imageFilename } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO tag(tagName,imageFilepath,imageFilename) VALUES (?,?,?)";
    connection.query(
      sqlInsert,
      [tagName, imageFilepath, imageFilename],
      function (err, result) {
        if (err) {
          error = "SQL Insert Error";
          responseCode = 500;
          console.log(err);
        } else {
          results.push("Success");
          responseCode = 201;
        }
        // package data
        var ret = {
          result: results,
          error: error,
        };
        // send data
        res.status(responseCode).json(ret);
        connection.release();
      }
    );
  });
};
