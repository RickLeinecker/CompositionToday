// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getTagsForContent
exports.getTagsForContent = async (req, res) => {
  // incoming: contentID
  // outgoing: content, error
  // to

  var error = "";
  var results = [];
  var responseCode = 0;

  const { contentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT tag.id,contentTag.contentID,tag.tagName,contentTag.id AS contentTagID 
      FROM contentTag INNER JOIN tag ON contentTag.tagID=tag.id WHERE contentID=?`,
      [contentID],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            results = result;
            responseCode = 200;
          } else {
            error = "This content has no tags";
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
        connection.release();
      }
    );
  });
};
