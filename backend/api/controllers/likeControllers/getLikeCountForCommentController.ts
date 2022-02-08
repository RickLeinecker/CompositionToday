// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getLikeCountForComment
exports.getLikeCountForComment = async (req, res) => {
  // incoming: commentID
  // outgoing: likes, error

  var error = "";
  var results = [];
  var responseCode = 0;
  const { commentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT COUNT(*) AS likeCount,likes.commentID,COUNT(CASE WHEN likeType.likeType = 'thumbs_up' THEN 1 ELSE NULL END) AS likedCount,COUNT(CASE WHEN likeType.likeType = 'heart' THEN 1 ELSE NULL END) AS lovedCount FROM likes INNER JOIN likeType ON likes.likeTypeID=likeType.id WHERE commentID=?",
      [commentID],
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
            error = "No likes exist";
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
