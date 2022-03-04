// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// editProject
exports.editProject = async (req, res) => {
  // incoming: projectID, url, imageFilepath, imageFilename, projectTitle, description, backgroundColor
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const {
    projectID,
    url,
    imageFilepath,
    imageFilename,
    projectTitle,
    description,
    backgroundColor,
  } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE relatedProjects SET ";
  if (url !== null && url !== undefined) {
    insertString += "url=?,";
    insertArray.push(url);
  }
  if (imageFilepath !== null && imageFilepath !== undefined) {
    insertString += "imageFilepath=?,";
    insertArray.push(imageFilepath);
  }
  if (imageFilename !== null && imageFilename !== undefined) {
    insertString += "imageFilename=?,";
    insertArray.push(imageFilename);
  }
  if (projectTitle !== null && projectTitle !== undefined) {
    insertString += "projectTitle=?,";
    insertArray.push(projectTitle);
  }
  if (description !== null && description !== undefined) {
    insertString += "description=?,";
    insertArray.push(description);
  }
  if (backgroundColor !== null && backgroundColor !== undefined) {
    insertString += "backgroundColor=?,";
    insertArray.push(backgroundColor);
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
