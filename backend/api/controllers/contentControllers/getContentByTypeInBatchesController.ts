// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getContentByTypeInBatches
exports.getContentByTypeInBatches = async (req, res) => {
  // incoming: contentType
  // outgoing: content, error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { contentType, startIndex, endIndex } = req.body;
  var numberOfRecords = endIndex - startIndex + 1;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM content WHERE contentType=? LIMIT ?,?",
      [contentType, startIndex, numberOfRecords],
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
            error = "Content does not exist";
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

// NOTE: reverse scrolling, stretch goal? -- slow loading when > 6000 posts
