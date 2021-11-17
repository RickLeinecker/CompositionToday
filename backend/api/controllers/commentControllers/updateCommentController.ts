// mysql connection
var { connection } = require("../../../database/database.ts");

// updateComment
exports.updateComment = async (req, res) => {
  // incoming: contentID, commenterUserID, timestamp, likeType, comment, approved, commentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const {
    contentID,
    commenterUserID,
    timestamp,
    likeType,
    comment,
    approved,
    commentID,
  } = req.body;
  var sqlInsert =
    "UPDATE comments SET contentID=?,commenterUserID=?,timestamp=?,likeType=?,comment=?,approved=? WHERE id=?";

  connection.query(
    sqlInsert,
    [
      contentID,
      commenterUserID,
      timestamp,
      likeType,
      comment,
      approved,
      commentID,
    ],
    function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
          responseCode = 200;
        } else {
          error = "Comment does not exist";
          responseCode = 500;
        }
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
