// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// Note: we need to do the same thing for user tags

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
      "SELECT * FROM contentTag WHERE contentID=?",
      [contentID],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            // after getting contentTags from contentTag table,
            // get tag information from tag table (tagName)
            let tagID = result[0].tagID;
            // run query
            connection.query(
              "SELECT * FROM tag WHERE id=?",
              [tagID],
              function (err, result) {
                if (err) {
                  error = "SQL Search Error";
                  responseCode = 500;
                  console.log(err);
                } else {
                  if (result[0]) {
                    results = result[0];
                    responseCode = 200;
                  } else {
                    error = "This tag does not exist";
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
                return;
              }
            );
          } else {
            error = "This content has no tags";
            responseCode = 500;
            // package data
            var ret = {
              result: results,
              error: error,
            };
            // send data
            res.status(responseCode).json(ret);
            connection.release();
          }
        }
      }
    );
  });
};
