// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getHomefeedContentInBatches
exports.getHomefeedContentInBatches = async (req, res) => {
  // incoming: contentTypeArray: array [music, events, etc.], sortBy: string -> "newest", "popular", "etc."
  // outgoing: content, error

  // get data from frontend
  const { contentTypeArray, sortBy, startIndex, endIndex } = req.body;
  var numberOfRecords = endIndex - startIndex + 1;

  var error = "";
  var results = [];
  var responseCode = 0;
  var insertString = "SELECT * FROM content ";
  var array = JSON.parse(contentTypeArray);
  // if contentTypeArray has contentTypes, build string
  if (array.length > 0) {
    insertString += "WHERE ";
    for (var contentT in array) {
      insertString += "contentType=" + contentT + " AND ";
    }
    insertString.slice(0, -5);
  }
  if (sortBy == "newest" || !sortBy) {
    // append order by desc
    insertString += " ORDER BY timestamp DESC";
  } else {
    // do some algos
    // filter by popularity -> show the content w/largest likeCount in DESC order
    // get likeCount for content and show most liked first
  }
  // limit for batches
  insertString += " LIMIT ?,?;";

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      insertString,
      [startIndex, numberOfRecords],
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
