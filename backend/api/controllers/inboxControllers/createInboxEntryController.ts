// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createInboxEntry
exports.createInboxEntry = async (req, res) => {
  // incoming: contentID, profileID, requesterID, commentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, profileID, requesterID, commentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO inbox(contentID,profileID,requesterID,commentID) VALUES (?,?,?,?)";
    connection.query(
      sqlInsert,
      [contentID, profileID, requesterID, commentID],
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
