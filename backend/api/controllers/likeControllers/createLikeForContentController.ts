// creates a like for a content

// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createLikeForContent
exports.createLikeForContent = async (req, res) => {
  // incoming: userID, timestamp, likeTypeID, contentID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { userID, timestamp, likeTypeID, contentID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO likes(userID, timestamp, likeTypeID, contentID) VALUES (?,?,?,?)";
    connection.query(
      sqlInsert,
      [userID, timestamp, likeTypeID, contentID],
      function (err, result) {
        if (err) {
          error = "SQL Insert Error";
          responseCode = 500;
          console.log(err);
        } else {
          results.push("Success");
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
        connection.release();
      }
    );
  });
};
