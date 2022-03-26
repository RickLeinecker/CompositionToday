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
  //Give batches to frontend — getComposersByGenre (new input: genre, startIndex, endIndex)
  // (new output: userID, firstName, lastName, username, profilePicPath, audioFilepath, audioFilename — only fetch featured song)

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT DISTINCT user.id,user.uid,userProfile.displayName,user.firstName,user.lastName,user.username,user.email,user.isPublisher,specializationTag.tagID,tag.tagName,userProfile.profilePicPath,content.audioFilename,content.audioFilepath 
      FROM user INNER JOIN specializationTag ON user.uid=specializationTag.uid 
      INNER JOIN tag ON specializationTag.tagID=tag.id AND tag.tagName=? AND tag.approvedGenre=1 
      INNER JOIN userProfile ON user.id=userProfile.userID
      LEFT JOIN (SELECT DISTINCT userID,audioFilepath,audioFilename FROM content LIMIT 1) content ON user.id=content.userID`,
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
