// mysql connection

var { mysql_pool } = require("../../../database/database.ts");

// getComposersByGenre
exports.getComposersByGenre = async (req, res) => {
  // incoming: genre
  // outgoing: users, error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;
  const { genre } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT user.id, user.uid, user.firstName, user.lastName, user.username, user.email, user.isPublisher, specializationTag.tagID, tag.tagName FROM user INNER JOIN specializationTag ON user.id=specializationTag.userID INNER JOIN tag ON specializationTag.tagID=tag.id AND tag.tagName=?",
      [genre],
      function (err, result) {
        if (err) {
          error = err;
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            results = result;
            responseCode = 200;
          } else {
            error = "No Composers Specialize In This Genre";
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

  // query database, handle errors, return JSON
};
