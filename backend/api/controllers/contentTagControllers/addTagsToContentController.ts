// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// addTagsToContent
exports.addTagsToContent = async (req, res) => {
  // incoming: contentID, tagID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { contentTagArray } = req.body;

  for (var i = 0; i < contentTagArray.length; ++i) {
    sqlQuery(i);
    function sqlQuery(index) {
      mysql_pool.getConnection(function (err, connection) {
        const sqlInsert =
          "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)";
        connection.query(
          sqlInsert,
          [contentTagArray[index].contentID, contentTagArray[index].tagID],
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
    }
  }
};
