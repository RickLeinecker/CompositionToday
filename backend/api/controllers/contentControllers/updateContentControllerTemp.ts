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

  // get current content, if fields differ, then update
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "SELECT * FROM content WHERE id=?",
      [contentID],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            // build update string with non null fields
            var insertString = "UPDATE content SET ";
            if (result[0].userID !== userID) {
              insertString += "userID=?,";
              insertArray.push(userID);
            }

            if (result[0].imageFilepathArray !== imageFilepathArray) {
              insertString += "imageFilepathArray=?,";
              insertArray.push(imageFilepathArray);
            }

            if (result[0].contentText !== contentText) {
              insertString += "contentText=?,";
              insertArray.push(contentText);
            }

            if (result[0].location !== location) {
              insertString += "location=?,";
              insertArray.push(location);
            }

            if (result[0].timestamp !== timestamp) {
              insertString += "timestamp=?,";
              insertArray.push(timestamp);
            }

            if (result[0].audioFilepath !== audioFilepath) {
              insertString += "audioFilepath=?,";
              insertArray.push(audioFilepath);
            }

            if (result[0].sheetMusicFilepath !== sheetMusicFilepath) {
              insertString += "sheetMusicFilepath=?,";
              insertArray.push(sheetMusicFilepath);
            }

            if (result[0].contentType !== contentType) {
              insertString += "contentType=?,";
              insertArray.push(contentType);
            }

            if (result[0].contentName !== contentName) {
              insertString += "contentName=?,";
              insertArray.push(contentName);
            }

            if (result[0].websiteLink !== websiteLink) {
              insertString += "websiteLink=?,";
              insertArray.push(websiteLink);
            }

            if (result[0].collaborators !== collaborators) {
              insertString += "collaborators=?,";
              insertArray.push(collaborators);
            }

            if (result[0].description !== description) {
              insertString += "description=?,";
              insertArray.push(description);
            }
            if (result[0].toDate !== toDate) {
              insertString += "toDate=?,";
              insertArray.push(toDate);
            }
            if (result[0].fromDate !== fromDate) {
              insertString += "fromDate=?,";
              insertArray.push(fromDate);
            }
            if (result[0].isDateCurrent !== isDateCurrent) {
              insertString += "isDateCurrent=?,";
              insertArray.push(isDateCurrent);
            }
            if (result[0].price !== price) {
              insertString += "price=?,";
              insertArray.push(price);
            }
            if (result[0].audioFilename !== audioFilename) {
              insertString += "audioFilename=?,";
              insertArray.push(audioFilename);
            }
            if (result[0].sheetMusicFilename !== sheetMusicFilename) {
              insertString += "sheetMusicFilename=?,";
              insertArray.push(sheetMusicFilename);
            }
            if (result[0].mapsEnabled !== mapsEnabled) {
              insertString += "mapsEnabled=?,";
              insertArray.push(mapsEnabled);
            }
            if (result[0].imageFilepath !== imageFilepath) {
              insertString += "imageFilepath=?,";
              insertArray.push(imageFilepath);
            }
            if (result[0].imageFilename !== imageFilename) {
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
                      } else {
                        error = "Content does not exist";
                        responseCode = 500;
                        console.log(error);
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
            responseCode = 200;
            results.push("Success");
          } else {
            error = "Content does not exist";
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
