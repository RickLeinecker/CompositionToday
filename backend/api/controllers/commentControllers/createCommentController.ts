// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createComment
exports.createComment = async (req, res) => {
  // incoming: contentID, commenterUID, timestamp, comment, approved
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { contentID, commenterUID, timestamp, comment, approved } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO comment(contentID,commenterUID,timestamp,comment,approved) VALUES (?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [contentID, commenterUID, timestamp, comment, approved],
      function (err, result) {
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
      }
    );
  });
};
