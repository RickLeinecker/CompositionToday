// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateComment
exports.updateComment = async (req, res) => {
  // incoming: contentID, commenterUserID, timestamp, comment, approved, commentID
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;
  var isEdited = 0;

  const {
    contentID,
    commenterUserID,
    timestamp,
    comment,
    approved,
    commentID,
  } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE comment SET ";
  if (contentID !== null && contentID !== undefined) {
    insertString += "contentID=?,";
    insertArray.push(contentID);
  }

  if (commenterUserID !== null && commenterUserID !== undefined) {
    insertString += "commenterUserID=?,";
    insertArray.push(commenterUserID);
  }

  if (timestamp !== null && timestamp !== undefined) {
    insertString += "timestamp=?,";
    insertArray.push(timestamp);
  }

  if (comment !== null && comment !== undefined) {
    insertString += "comment=?,";
    insertArray.push(comment);
  }

  if (approved !== null && approved !== undefined) {
    insertString += "approved=?,";
    insertArray.push(approved);
  }

  insertString = insertString.slice(0, -1);
  insertString += ",isEdited=1";
  insertString += " WHERE id=?";
  insertArray.push(commentID);

  // var sqlInsert =
  //   "UPDATE comment SET contentID=?,commenterUserID=?,timestamp=?,comment=?,approved=? WHERE id=?";

  mysql_pool.getConnection(function (err, connection) {
    connection.query(insertString, insertArray, function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results.push("Success");
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
      connection.release();
    });
  });
};
