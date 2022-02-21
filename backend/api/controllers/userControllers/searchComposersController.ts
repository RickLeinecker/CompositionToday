// mysql connection
const Fuse = require("fuse.js");
var { mysql_pool } = require("../../../database/database.ts");

// searchComposers
exports.searchComposers = async (req, res) => {
  // incoming: genre
  // outgoing: users, error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;
  const { searchQuery, genre } = req.body;
  // build insert string
  var insertString = `SELECT DISTINCT user.id,user.uid,user.firstName,
  user.lastName,user.username,user.email,user.isPublisher,
  userProfile.profilePicPath,content.audioFilename,content.audioFilepath`;
  // if genre is passed in from frontend,
  // then, add genre tag searching
  if (genre) {
    insertString += `,specializationTag.tagID,tag.tagName
    FROM user INNER JOIN specializationTag ON user.id=specializationTag.userID 
    INNER JOIN tag ON specializationTag.tagID=tag.id AND tag.tagName=? AND tag.approvedGenre=1`;
  } else {
    insertString += ` FROM user`;
  }
  insertString += ` INNER JOIN userProfile ON user.id=userProfile.userID
  LEFT JOIN (SELECT DISTINCT userID,audioFilepath,audioFilename FROM content WHERE isFeaturedSong=1) content ON user.id=content.userID`;

  // query the database and return results
  mysql_pool.getConnection(function (err, connection) {
    connection.query(insertString, [genre], function (err, result) {
      if (err) {
        error = err;
        responseCode = 500;
        console.log(err);
      } else {
        if (result[0]) {
          // if there are results, then fuse.js search
          // pass in list to new fuse object,
          // and search query
          // return result
          const options = {
            // isCaseSensitive: false,
            // includeScore: false,
            // shouldSort: true,
            // includeMatches: false,
            // findAllMatches: false,
            minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.6,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            // fieldNormWeight: 1,
            keys: ["username", "firtName", "lastName"],
          };
          const fuse = new Fuse(result, options);

          results = fuse.search(searchQuery);
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
    });
  });
};
