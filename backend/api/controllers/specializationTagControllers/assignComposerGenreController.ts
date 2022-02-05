// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// assignComposerGenre
exports.assignComposerGenre = async (req, res) => {
  // incoming: userID, tagName
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;
  const { userID, tagName } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM tag WHERE tagName=?",
      [tagName],
      function (err, result) {
        if (err) {
          error =
            "Valid Genres: Opera, Classical, Jazz, Symphony, Film Score, Chamber, EDM";
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
            connection.release();
            mysql_pool.getConnection(function (err, connection) {
              var tagID = result[0].id;
              const sqlInsert =
                "INSERT INTO specializationTag(userID, tagID) VALUES (?,?)";
              connection.query(
                sqlInsert,
                [userID, tagID],
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
          } else {
            error =
              "Valid Genres: Opera, Classical, Jazz, Symphony, Film Score, Chamber, EDM";
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
          }
        }
      }
    );
  });
};
