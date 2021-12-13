// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createComment
exports.createComment = async (req, res) => {
  // incoming: contentID, commenterUserID, timestamp, likes, comment, approved
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, commenterUserID, timestamp, likes, comment, approved } =
    req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO comment(contentID,commenterUserID,timestamp,likes,comment,approved) VALUES (?,?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [contentID, commenterUserID, timestamp, likes, comment, approved],
      function (err, result) {
        if (err) {
          error = "SQL Insert Error";
          responseCode = 500;
          // console.log(err);
        } else {
          results = "Success";
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
      }
    );
  });
};
