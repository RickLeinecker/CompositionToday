// mysql connection
var { mysql_pool } = require("../../../database/database.ts");
const fs2 = require("fs");

// updateContent
exports.updateContent = async (req, res) => {
  // incoming: userID, contentID, imageFilePathArray, contentText, location, timestamp, audioFilepath,
  // sheetMusicFilepath, contentType, contentName, websiteLink, collaborators, description
  // toDate, fromDate, isDateCurrent, price, audioFilename, sheetMusicFilename, mapsEnabled
  // imageFilepath, imageFilename
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
    price,
    audioFilename,
    sheetMusicFilename,
    mapsEnabled,
    imageFilepath,
    imageFilename,
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
  if (isDateCurrent == true || isDateCurrent == false) {
    insertString += "isDateCurrent=?,";
    insertArray.push(isDateCurrent);
  }
  if (price) {
    insertString += "price=?,";
    insertArray.push(price);
  }
  if (audioFilename) {
    insertString += "audioFilename=?,";
    insertArray.push(audioFilename);
  }
  if (sheetMusicFilename) {
    insertString += "sheetMusicFilename=?,";
    insertArray.push(sheetMusicFilename);
  }
  if (mapsEnabled == true || mapsEnabled == false) {
    insertString += "mapsEnabled=?,";
    insertArray.push(mapsEnabled);
  }
  if (imageFilepath) {
    insertString += "imageFilepath=?,";
    insertArray.push(imageFilepath);
  }
  if (imageFilename) {
    insertString += "imageFilename=?,";
    insertArray.push(imageFilename);
  }

  insertString = insertString.slice(0, -1);
  insertString += " WHERE id=?";
  insertArray.push(contentID);

  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT content.imageFilepath, content.sheetMusicFilepath, content.audioFilepath FROM content WHERE id=?",
      [contentID],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
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
            results.push(result[0]);
            responseCode = 200;
          } else {
            error = "Content does not exist";
            responseCode = 500;

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
        // if the filepath does not match,
        // then delete file and let the
        // following query handle the
        // updated filename and filepath
        if (result.audioFilepath && result.audioFilepath != audioFilepath) {
          // delete file
          let modifiedFilepath = result.audioFilepath.split("/");
          modifiedFilepath =
            "/var/www/assets/" +
            modifiedFilepath[3] +
            "/" +
            modifiedFilepath[4];
          // delete a file
          fs2.unlink(modifiedFilepath, (err) => {
            if (err) {
              error = "Error Updating File";
              console.log(err);
            } else {
              responseCode = 200;
            }
          });
        }
        if (result.imageFilepath && result.imageFilepath != imageFilepath) {
          // delete file
          let modifiedFilepath = result.imageFilepath.split("/");
          modifiedFilepath =
            "/var/www/assets/" +
            modifiedFilepath[3] +
            "/" +
            modifiedFilepath[4];
          // delete a file
          fs2.unlink(modifiedFilepath, (err) => {
            if (err) {
              error = "Error Updating File";
              console.log(err);
            } else {
              responseCode = 200;
            }
          });
        }
        if (
          result.sheetMusicFilepath &&
          result.sheetMusicFilepath != sheetMusicFilepath
        ) {
          // delete file
          let modifiedFilepath = result.sheetMusicFilepath.split("/");
          modifiedFilepath =
            "/var/www/assets/" +
            modifiedFilepath[3] +
            "/" +
            modifiedFilepath[4];
          // delete a file
          fs2.unlink(modifiedFilepath, (err) => {
            if (err) {
              error = "Error Updating File";
              console.log(err);
            } else {
              responseCode = 200;
            }
          });
        }
        connection.release();
      }
    );
  });
  results = [];
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
        // log result
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
