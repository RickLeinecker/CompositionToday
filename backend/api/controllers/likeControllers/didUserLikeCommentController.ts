// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// didUserLikeComment
exports.didUserLikeComment = async (req, res) => {
  // incoming: commentID, uid
  // outgoing: likes, error

  var error = "";
  var results;
  var responseCode = 0;

  const { commentID, uid } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT likes.id AS likeID,likeType.likeType,likeType.id AS likeTypeID FROM likes INNER JOIN likeType ON likes.likeTypeID=likeType.id WHERE likes.commentID=? and likes.uid=?;",
      [commentID, uid],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            result[0].isLiked = true;
            results = result[0];
            responseCode = 200;
          } else {
            var obj = {
              likeID: null,
              likeType: null,
              likeTypeID: null,
              isLiked: false,
            };
            results = obj;
            responseCode = 200;
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
