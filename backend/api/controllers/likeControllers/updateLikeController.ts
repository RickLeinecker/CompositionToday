// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateLike
exports.updateLike = async (req, res) => {
  // incoming: likeID, userID, timestamp, likeTypeID, commentID, contentID
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const { likeID, userID, timestamp, likeTypeID, commentID, contentID } =
    req.body;

  // build update string with non null fields
  var insertString = "UPDATE likes SET ";
  if (userID) {
    insertString += "userID=?,";
    insertArray.push(userID);
  }

  if (timestamp) {
    insertString += "timestamp=?,";
    insertArray.push(timestamp);
  }

  if (likeTypeID) {
    insertString += "likeTypeID=?,";
    insertArray.push(likeTypeID);
  }

  if (commentID) {
    insertString += "commentID=?,";
    insertArray.push(commentID);
  }

  if (contentID) {
    insertString += "contentID=?,";
    insertArray.push(contentID);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(likeID);

  // var sqlInsert =
  //   "UPDATE likes SET userID=?,timestamp=?,likeTypeID=?,commentID=?,contentID=? WHERE id=?";
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
          error = "Like does not exist";
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
