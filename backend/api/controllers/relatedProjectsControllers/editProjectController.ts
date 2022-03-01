// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// editProject
exports.editProject = async (req, res) => {
  // incoming: projectID, url, img_path, title, desc
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const { projectID, url, img_path, title, desc } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE relatedProjects SET ";
  if (url !== null && url !== undefined) {
    insertString += "url=?,";
    insertArray.push(url);
  }
  if (img_path !== null && img_path !== undefined) {
    insertString += "img_path=?,";
    insertArray.push(img_path);
  }
  if (title !== null && title !== undefined) {
    insertString += "title=?,";
    insertArray.push(title);
  }
  if (desc !== null && desc !== undefined) {
    insertString += "desc=?,";
    insertArray.push(desc);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(projectID);

  mysql_pool.getConnection(function (err, connection) {
    connection.query(insertString, insertArray, function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results.push("Success");
          responseCode = 200;
        } else {
          error = "Project does not exist";
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
