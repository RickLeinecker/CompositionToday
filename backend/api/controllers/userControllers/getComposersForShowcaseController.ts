// mysql connection

var { mysql_pool } = require("../../../database/database.ts");

// getComposersForShowcase
exports.getComposersForShowcase = async (req, res) => {
  // incoming: genre
  // outgoing: users, error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;
  const { genre } = req.body;
  //Give batches to frontend — getComposersByGenre (new input: genre, startIndex, endIndex)
  // (new output: userID, firstName, lastName, username, profilePicPath, audioFilepath, audioFilename — only fetch featured song)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT COUNT(*) as count FROM user;",
      function (err, result) {
        if (err) {
          error = err;
          responseCode = 500;
          console.log(err);
          // package data
          var ret = {
            result: results,
            error: error,
          };
          // send data
          res.status(responseCode).json(ret);
          connection.release();
          return;
        } else {
          if (result[0]) {
            responseCode = 200;
            mysql_pool.getConnection(function (err, connection) {
              connection.query(
                `SELECT DISTINCT user.id,user.uid,userProfile.displayName,user.firstName,user.lastName,user.username,user.email,user.isPublisher,userProfile.profilePicPath,c1.audioFilename,c1.audioFilepath
                FROM user INNER JOIN userProfile ON user.id=userProfile.userID
                LEFT JOIN (SELECT DISTINCT userID,audioFilepath,audioFilename FROM content LIMIT 1) AS c1 ON user.id=c1.userID`,
                function (err, result2) {
                  if (err) {
                    error = err;
                    responseCode = 500;
                    console.log(err);
                  } else {
                    if (result2[0]) {
                      var num1 = getRandomInt(result2.length - 5);
                      results = result2.slice(num1, num1 + 4);
                      responseCode = 200;
                    } else {
                      error = "No Composers Found";
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
          } else {
            error = "No Composers Found";
            responseCode = 500;
            // package data
            var ret = {
              result: results,
              error: error,
            };
            // send data
            res.status(responseCode).json(ret);
            connection.release();
            return;
          }
        }
      }
    );
  });

  // query database, handle errors, return JSON
};
