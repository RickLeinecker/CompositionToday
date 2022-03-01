// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// addGenre
exports.addGenre = async (req, res) => {
  // incoming: genre
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const { genre, imageFilepath } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM tag WHERE tagName=?",
      [genre],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
          finishProcess();
        } else {
          if (result[0]) {
            if (result[0].approvedGenre === 1) {
              error = "Genre already exists";
              responseCode = 200;
              finishProcess();
            }
            var insertString = "UPDATE tag SET approvedGenre=? WHERE id=?;";
            insertArray.push(1);
            insertArray.push(result[0].id);

            mysql_pool.getConnection(function (err, connection) {
              connection.query(
                insertString,
                insertArray,
                function (err, result) {
                  if (err) {
                    error = "SQL Update Error";
                    responseCode = 500;
                    console.log(err);
                    finishProcess();
                  } else {
                    if (result.affectedRows > 0) {
                      results.push("Success");
                      responseCode = 200;
                    } else {
                      error = "This genre does not exist";
                      responseCode = 500;
                    }
                  }
                  connection.release();
                  finishProcess();
                }
              );
            });
          } else {
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
                  connection.release();
                  finishProcess();
                }
              );
            });
          }
        }
        function finishProcess() {
          // package data
          var ret = {
            result: results,
            error: error,
          };
          // send data
          res.status(responseCode).json(ret);
          connection.release();
        }
      }
    );
  });
};
