// mysql connection
var { mysql_pool } = require("../../../database/database.ts");
// const fs2 = require("fs");

// updateContent
exports.updateContent = async (req, res) => {
  // incoming: uid, contentID, imageFilePathArray, contentText, location, timestamp, audioFilepath,
  // sheetMusicFilepath, contentType, contentName, websiteLink, collaborators, description
  // toDate, fromDate, isDateCurrent, price, audioFilename, sheetMusicFilename, mapsEnabled
  // imageFilepath, imageFilename
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;

  const {
    uid,
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

  mysql_pool.getConnection(function (err, connection) {
    // query database, handle errors, return JSON
    connection.query(
      "SELECT * FROM user WHERE uid=?",
      [uid],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            responseCode = 200;
            // build update string with non null fields
            var insertString = "UPDATE content SET ";
            if (result[0].id != null) {
              insertString += "userID=?,";
              insertArray.push(result[0].id);
            }

            if (imageFilepathArray != null) {
              insertString += "imageFilepathArray=?,";
              insertArray.push(imageFilepathArray);
            }

            if (contentText != null) {
              insertString += "contentText=?,";
              insertArray.push(contentText);
            }

            if (location != null) {
              insertString += "location=?,";
              insertArray.push(location);
            }

            if (timestamp != null) {
              insertString += "timestamp=?,";
              insertArray.push(timestamp);
            }

            if (audioFilepath != null) {
              insertString += "audioFilepath=?,";
              insertArray.push(audioFilepath);
            }

            if (sheetMusicFilepath != null) {
              insertString += "sheetMusicFilepath=?,";
              insertArray.push(sheetMusicFilepath);
            }

            if (contentType != null) {
              insertString += "contentType=?,";
              insertArray.push(contentType);
            }

            if (contentName != null) {
              insertString += "contentName=?,";
              insertArray.push(contentName);
            }

            if (websiteLink != null) {
              insertString += "websiteLink=?,";
              insertArray.push(websiteLink);
            }

            if (collaborators != null) {
              insertString += "collaborators=?,";
              insertArray.push(collaborators);
            }

            if (description != null) {
              insertString += "description=?,";
              insertArray.push(description);
            }
            if (toDate != null) {
              insertString += "toDate=?,";
              insertArray.push(toDate);
            }
            if (fromDate != null) {
              insertString += "fromDate=?,";
              insertArray.push(fromDate);
            }
            if (isDateCurrent != null) {
              insertString += "isDateCurrent=?,";
              insertArray.push(isDateCurrent);
            }
            if (price != null) {
              insertString += "price=?,";
              insertArray.push(price);
            }
            if (audioFilename != null) {
              insertString += "audioFilename=?,";
              insertArray.push(audioFilename);
            }
            if (sheetMusicFilename != null) {
              insertString += "sheetMusicFilename=?,";
              insertArray.push(sheetMusicFilename);
            }
            if (mapsEnabled != null) {
              insertString += "mapsEnabled=?,";
              insertArray.push(mapsEnabled);
            }
            if (imageFilepath != null) {
              insertString += "imageFilepath=?,";
              insertArray.push(imageFilepath);
            }
            if (imageFilename != null) {
              insertString += "imageFilename=?,";
              insertArray.push(imageFilename);
            }

            if (insertString.length > 19) {
              insertString = insertString.slice(0, -1);
              insertString += " WHERE id=?";
              insertArray.push(contentID);

              mysql_pool.getConnection(function (err, connection) {
                connection.query(
                  insertString,
                  insertArray,
                  function (err, result) {
                    if (err) {
                      error = "SQL Update Error";
                      responseCode = 500;
                      console.log(err);
                    } else {
                      if (result.affectedRows > 0) {
                        results.push("Success");
                        responseCode = 200;
                        processChanges();
                      } else {
                        error = "Content does not exist";
                        responseCode = 500;
                        console.log(error);
                        processChanges();
                      }
                      // log result
                      // console.log(result);
                    }
                    // package data
                    // var ret = {
                    //   result: results,
                    //   error: error,
                    // };
                    // // send data
                    // res.status(responseCode).json(ret);
                    connection.release();
                  }
                );
              });
            }
          } else {
            error = "User does not exist";
            responseCode = 500;
            processChanges();
          }
        }
        function processChanges() {
          // package data
          var ret = {
            result: results,
            error: error,
          };
          // send data
          res.status(responseCode).json(ret);
        }

        connection.release();
      }
    );
  });
};

// ------------- AUTO DELETE ON UPDATE CODE v1 -----------
// mysql_pool.getConnection(function (err, connection) {
//   connection.query(
//     "SELECT content.imageFilepath, content.sheetMusicFilepath, content.audioFilepath FROM content WHERE id=?",
//     [contentID],
//     function (err, result) {
//       if (err) {
//         error = "SQL Search Error";
//         responseCode = 500;
//         console.log(err);
//         // package data
//         // var ret = {
//         //   result: results,
//         //   error: error,
//         // };
//         // // send data
//         // res.status(responseCode).json(ret);
//         // connection.release();
//         // return;
//       } else {
//         if (result[0]) {
//           responseCode = 200;
//         } else {
//           error = "Content does not exist";
//           responseCode = 500;
//           console.log(error);
//           // package data
//           // var ret = {
//           //   result: results,
//           //   error: error,
//           // };
//           // // send data
//           // res.status(responseCode).json(ret);
//           // connection.release();
//           // return;
//         }
//       }
//       // if the filepath does not match,
//       // then delete file and let the
//       // following query handle the
//       // updated filename and filepath
//       // console.log(result[0].audioFilepath);
//       // if (
//       //   result[0].audioFilepath &&
//       //   result[0].audioFilepath != audioFilepath
//       // ) {
//       //   // delete file
//       //   let modifiedFilepath = result[0].audioFilepath.split("/");
//       //   modifiedFilepath =
//       //     "/var/www/assets/" +
//       //     modifiedFilepath[3] +
//       //     "/" +
//       //     modifiedFilepath[4];

//       //   // delete a file
//       //   fs2.unlink(modifiedFilepath, (err) => {
//       //     if (err) {
//       //       error = "Error Updating File";
//       //       console.log(err);
//       //     } else {
//       //       responseCode = 200;
//       //     }
//       //   });
//       // }
//       // if (
//       //   result[0].imageFilepath &&
//       //   result[0].imageFilepath != imageFilepath
//       // ) {
//       //   // delete file
//       //   let modifiedFilepath = result[0].imageFilepath.split("/");
//       //   modifiedFilepath =
//       //     "/var/www/assets/" +
//       //     modifiedFilepath[3] +
//       //     "/" +
//       //     modifiedFilepath[4];
//       //   // delete a file
//       //   fs2.unlink(modifiedFilepath, (err) => {
//       //     if (err) {
//       //       error = "Error Updating File";
//       //       console.log(err);
//       //     } else {
//       //       responseCode = 200;
//       //     }
//       //   });
//       // }
//       // if (
//       //   result[0].sheetMusicFilepath &&
//       //   result[0].sheetMusicFilepath != sheetMusicFilepath
//       // ) {
//       //   // delete file
//       //   let modifiedFilepath = result[0].sheetMusicFilepath.split("/");
//       //   modifiedFilepath =
//       //     "/var/www/assets/" +
//       //     modifiedFilepath[3] +
//       //     "/" +
//       //     modifiedFilepath[4];
//       //   // delete a file
//       //   fs2.unlink(modifiedFilepath, (err) => {
//       //     if (err) {
//       //       error = "Error Updating File";
//       //       console.log(err);
//       //     } else {
//       //       responseCode = 200;
//       //     }
//       //   });
//       // }
//       connection.release();
//     }
//   );
// });
// results = [];
