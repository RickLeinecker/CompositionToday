// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// updateContent
exports.updateContent = async (req, res) => {
  // incoming: userID, contentID, imageFilePathArray, contentText, location, timestamp, audioFilepath,
  // sheetMusicFilepath, contentType, contentName, websiteLink, collaborators, description
  // toDate, fromDate, isDateCurrent
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const {
    userID,
    imageFilepathArray,
    contentText,
    location,
    timestamp,
    audioFilepath,
    sheetMusicFilepath,
    contentType,
    contentName,
    websiteLink,
    contentID,
    description,
    collaborators,
    toDate,
    fromDate,
    isDateCurrent,
  } = req.body;

  // build update string with non null fields
  var insertString = "UPDATE content SET ";
  if (userID) {
    insertString += "userID=?,";
    insertArray.push(userID);
  }

  if (imageFilepathArray) {
    insertString += "imageFilepathArray=?,";
    insertArray.push(imageFilepathArray);
  }

  if (contentText) {
    insertString += "contentText=?,";
    insertArray.push(contentText);
  }

  if (location) {
    insertString += "location=?,";
    insertArray.push(location);
  }

  if (timestamp) {
    insertString += "timestamp=?,";
    insertArray.push(timestamp);
  }

  if (audioFilepath) {
    insertString += "audioFilepath=?,";
    insertArray.push(audioFilepath);
  }

  if (sheetMusicFilepath) {
    insertString += "sheetMusicFilepath=?,";
    insertArray.push(sheetMusicFilepath);
  }

  if (contentType) {
    insertString += "contentType=?,";
    insertArray.push(contentType);
  }

  if (contentName) {
    insertString += "contentName=?,";
    insertArray.push(contentName);
  }

  if (websiteLink) {
    insertString += "websiteLink=?,";
    insertArray.push(websiteLink);
  }

  if (collaborators) {
    insertString += "collaborators=?,";
    insertArray.push(collaborators);
  }

  if (description) {
    insertString += "description=?,";
    insertArray.push(description);
  }
  if (toDate) {
    insertString += "toDate=?,";
    insertArray.push(toDate);
  }
  if (fromDate) {
    insertString += "fromDate=?,";
    insertArray.push(fromDate);
  }
  if (isDateCurrent) {
    insertString += "isDateCurrent=?,";
    insertArray.push(isDateCurrent);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(contentID);

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
          error = "Content does not exist";
          responseCode = 500;
        }
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
    });
  });
};
