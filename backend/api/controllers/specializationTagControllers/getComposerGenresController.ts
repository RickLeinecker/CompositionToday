// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// getComposerGenresController
exports.getComposerGenres = async (req, res) => {
  // incoming: nothing
  // outgoing: tags, error

  var error = "";
  var results = [];
  var responseCode = 0;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT tag.id,tag.tagName,tag.imageFilepath FROM tag WHERE approvedGenre=1;",
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
            error = "No specialization tags exist";
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
// "SELECT DISTINCT tag.tagName FROM tag INNER JOIN specializationTag ON tag.id=specializationTag.tagID;"
