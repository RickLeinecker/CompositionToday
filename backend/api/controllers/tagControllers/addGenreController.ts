// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// addGenre
exports.addGenre = async (req, res) => {
  // incoming: genre
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { genre, imageFilepath } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO tag(tagName,approvedGenre,imageFilepath) VALUES (?,?,?)";
    connection.query(
      sqlInsert,
      [genre, 1, imageFilepath],
      function (err, result) {
        if (err) {
          error = "Genre already exists";
          responseCode = 200;
        } else {
          results.push("Success");
          responseCode = 201;
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
