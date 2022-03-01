// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// addProject
exports.addProject = async (req, res) => {
  // incoming: url, img_path, title, desc
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { url, imageFilepath, projectTitle, description } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "INSERT INTO relatedProjects(url, imageFilepath, projectTitle, description) VALUES (?,?,?,?);",
      [url, imageFilepath, projectTitle, description],
      function (err, result) {
        if (err) {
          error = "SQL Insert Error";
          responseCode = 500;
          console.log(err);
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
