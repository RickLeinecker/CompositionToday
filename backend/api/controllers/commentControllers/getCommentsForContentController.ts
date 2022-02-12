// get all of the comments for any content
// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getCommentsForContentController
exports.getCommentsForContent = async (req, res) => {
  // incoming: contentID
  // outgoing: comments, error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { contentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT comment.id,comment.contentID,comment.commenterUID,
      comment.timestamp,comment.comment,comment.approved,userProfile.profilePicPath,
      userProfile.displayName,user.username FROM comment
      INNER JOIN user ON comment.commenterUID=user.uid
      INNER JOIN userProfile ON user.id=userProfile.userID 
      WHERE contentID=?`,
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
            error = "No comments for this content";
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
