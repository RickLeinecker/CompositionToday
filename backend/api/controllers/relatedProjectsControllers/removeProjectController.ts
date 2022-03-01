// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// removeProject
exports.removeProject = async (req, res) => {
  // incoming: projectID
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const { projectID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "DELETE FROM relatedProjects WHERE id=?",
      [projectID],
      function (err, result) {
        if (err) {
          error = "SQL Delete Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results.push("Success");
            responseCode = 200;
          } else {
            error = "Project does not exist";
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
