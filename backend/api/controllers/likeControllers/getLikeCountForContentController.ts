// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getLikeCountForContent
exports.getLikeCountForContent = async (req, res) => {
  // incoming: contentID
  // outgoing: likes, error

  var error = "";
  var results = [];
  var responseCode = 0;
  const { contentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT COUNT(*) AS likeCount,likes.contentID,COUNT(CASE WHEN likeType.likeType = 'thumbs_up' THEN 1 ELSE NULL END) AS likedCount,COUNT(CASE WHEN likeType.likeType = 'heart' THEN 1 ELSE NULL END) AS lovedCount,COUNT(CASE WHEN likeType.likeType = 'celebration' THEN 1 ELSE NULL END) AS celebratedCount,COUNT(CASE WHEN likeType.likeType = 'music_notes' THEN 1 ELSE NULL END) AS jammedCount FROM likes INNER JOIN likeType ON likes.likeTypeID=likeType.id WHERE contentID=?",
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
