// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// addProject
exports.addProject = async (req, res) => {
  // incoming: url, imageFilepath, imageFilename, projectTitle, description, backgroundColor
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const {
    url,
    imageFilepath,
    imageFilename,
    projectTitle,
    description,
    backgroundColor,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "INSERT INTO relatedProjects(url, imageFilepath, imageFilename, projectTitle, description, backgroundColor) VALUES (?,?,?,?,?,?);",
      [
        url,
        imageFilepath,
        imageFilename,
        projectTitle,
        description,
        backgroundColor,
      ],
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
