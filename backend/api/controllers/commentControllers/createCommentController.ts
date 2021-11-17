// mysql connection
var { connection } = require("../../../database/database.ts");

// createComment
exports.createComment = async (req, res) => {
  // incoming: contentID, commenterUserID, likeType, comment
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { contentID, commenterUserID, timestamp, likeType, comment, approved } =
    req.body;

  const sqlInsert =
    "INSERT INTO comments(contentID,commenterUserID,timestamp,likeType,comment,approved) VALUES (?,?,?,?,?,?)";
  connection.query(
    sqlInsert,
    [contentID, commenterUserID, timestamp, likeType, comment, approved],
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
};
