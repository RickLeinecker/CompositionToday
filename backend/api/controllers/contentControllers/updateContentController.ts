// mysql connection
var { mysql_pool } = require("../../../database/database.ts");
const fs2 = require("fs");

// updateContent
exports.updateContent = async (req, res) => {
  // incoming: uid, contentID, imageFilePathArray, contentText, location, timestamp, audioFilepath,
  // sheetMusicFilepath, contentType, contentName, websiteLink, collaborators, description
  // toDate, fromDate, isDateCurrent, price, audioFilename, sheetMusicFilename, mapsEnabled
  // imageFilepath, imageFilename, isFeaturedSong, isContest
  // outgoing: error

  var error = "";
  var results = [];
  var insertArray = [];
  var responseCode = 0;
  var isEdited = 0;

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
    tagArray,
    isFeaturedSong,
    isContest,
  } = req.body;

  mysql_pool.getConnection(function (err, connection) {
    // query database, handle errors, return JSON
    connection.query(
      "SELECT user.id,content.imageFilepath,content.audioFilepath,content.sheetMusicFilepath FROM user INNER JOIN content ON content.id=? WHERE uid=?",
      [contentID, uid],
      function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            responseCode = 200;
            console.log(result[0]);
            // delete old files when content is being updated
            // delete audio file
            if (
              result[0].audioFilepath !== null &&
              result[0].audioFilepath !== "" &&
              result[0].audioFilepath !== undefined &&
              result[0].audioFilepath !== audioFilepath
            ) {
              let modifiedFilepath = result[0].audioFilepath.split("/");
              modifiedFilepath =
                "/var/www/assets/" +
                modifiedFilepath[3] +
                "/" +
                modifiedFilepath[4];

              fs2.unlink(modifiedFilepath, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Old audio file deleted.");
                }
              });
            }
            // delete image file
            if (
              result[0].imageFilepath !== null &&
              result[0].imageFilepath !== "" &&
              result[0].imageFilepath !== undefined &&
              result[0].imageFilepath !== imageFilepath
            ) {
              let modifiedFilepath = result[0].imageFilepath.split("/");
              modifiedFilepath =
                "/var/www/assets/" +
                modifiedFilepath[3] +
                "/" +
                modifiedFilepath[4];

              fs2.unlink(modifiedFilepath, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Old image file deleted.");
                }
              });
            }
            // delete sheetmusic file
            if (
              result[0].sheetMusicFilepath !== null &&
              result[0].sheetMusicFilepath !== "" &&
              result[0].sheetMusicFilepath !== undefined &&
              result[0].sheetMusicFilepath !== sheetMusicFilepath
            ) {
              // delete file
              let modifiedFilepath = result[0].sheetMusicFilepath.split("/");
              modifiedFilepath =
                "/var/www/assets/" +
                modifiedFilepath[3] +
                "/" +
                modifiedFilepath[4];
              // delete a file
              fs2.unlink(modifiedFilepath, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Old sheetmusic file deleted.");
                }
              });
            }
            // build update string with non null fields
            // update isEdited to true;
            isEdited = 1;
            var insertString = "UPDATE content SET ";
            if (result[0].id !== null && result[0].id !== undefined) {
              insertString += "userID=?,";
              insertArray.push(result[0].id);
            }

            if (
              imageFilepathArray !== null &&
              imageFilepathArray !== undefined
            ) {
              insertString += "imageFilepathArray=?,";
              insertArray.push(imageFilepathArray);
            }

            if (contentText !== null && contentText !== undefined) {
              insertString += "contentText=?,";
              insertArray.push(contentText);
            }

            if (location !== null && location !== undefined) {
              insertString += "location=?,";
              insertArray.push(location);
            }
            // remove edit timestamp
            // if (timestamp !== null && timestamp !== undefined) {
            //   insertString += "timestamp=?,";
            //   insertArray.push(timestamp);
            // }

            if (audioFilepath !== null && audioFilepath !== undefined) {
              insertString += "audioFilepath=?,";
              insertArray.push(audioFilepath);
            }

            if (
              sheetMusicFilepath !== null &&
              sheetMusicFilepath !== undefined
            ) {
              insertString += "sheetMusicFilepath=?,";
              insertArray.push(sheetMusicFilepath);
            }

            if (contentType !== null && contentType !== undefined) {
              insertString += "contentType=?,";
              insertArray.push(contentType);
            }

            if (contentName !== null && contentName !== undefined) {
              insertString += "contentName=?,";
              insertArray.push(contentName);
            }

            if (websiteLink !== null && websiteLink !== undefined) {
              insertString += "websiteLink=?,";
              insertArray.push(websiteLink);
            }

            if (collaborators !== null && collaborators !== undefined) {
              insertString += "collaborators=?,";
              insertArray.push(collaborators);
            }

            if (description !== null && description !== undefined) {
              insertString += "description=?,";
              insertArray.push(description);
            }
            if (toDate !== null && toDate !== undefined) {
              insertString += "toDate=?,";
              insertArray.push(toDate);
            }
            if (fromDate !== null && fromDate !== undefined) {
              insertString += "fromDate=?,";
              insertArray.push(fromDate);
            }
            if (isDateCurrent !== null && isDateCurrent !== undefined) {
              insertString += "isDateCurrent=?,";
              insertArray.push(isDateCurrent);
            }
            if (price !== null && price !== undefined) {
              insertString += "price=?,";
              insertArray.push(price);
            }
            if (audioFilename !== null && audioFilename !== undefined) {
              insertString += "audioFilename=?,";
              insertArray.push(audioFilename);
            }
            if (
              sheetMusicFilename !== null &&
              sheetMusicFilename !== undefined
            ) {
              insertString += "sheetMusicFilename=?,";
              insertArray.push(sheetMusicFilename);
            }
            if (mapsEnabled !== null && mapsEnabled !== undefined) {
              insertString += "mapsEnabled=?,";
              insertArray.push(mapsEnabled);
            }
            if (imageFilepath !== null && imageFilepath !== undefined) {
              insertString += "imageFilepath=?,";
              insertArray.push(imageFilepath);
            }
            if (imageFilename !== null && imageFilename !== undefined) {
              insertString += "imageFilename=?,";
              insertArray.push(imageFilename);
            }
            if (isFeaturedSong !== null && isFeaturedSong !== undefined) {
              insertString += "isFeaturedSong=?,";
              insertArray.push(isFeaturedSong);
            }
            if (isContest !== null && isContest !== undefined) {
              insertString += "isContest=?,";
              insertArray.push(isContest);
            }

            if (isFeaturedSong === true || isFeaturedSong === 1) {
              mysql_pool.getConnection(function (err, connection) {
                connection.query(
                  "SELECT * FROM content WHERE userID=? AND isFeaturedSong=1;",
                  [result[0].id],
                  function (err, resultForUpdate) {
                    if (err) {
                      console.log(err);
                    } else {
                      if (resultForUpdate[0]) {
                        mysql_pool.getConnection(function (err, connection) {
                          connection.query(
                            "UPDATE content SET isFeaturedSong=0 WHERE id=?",
                            [resultForUpdate[0].id],
                            function (err, resultAfterUpdate) {
                              if (err) {
                                console.log(err);
                              } else {
                                if (resultAfterUpdate.affectedRows > 0) {
                                  // success
                                } else {
                                  console.log("Content does not exists");
                                }
                              }
                              connection.release();
                            }
                          );
                        });
                      } else {
                        console.log("Content does not exists");
                      }
                    }
                    connection.release();
                  }
                );
              });
            }

            if (insertString.length > 19) {
              insertString = insertString.slice(0, -1);
              // update isEdited
              insertString += ",isEdited=1";

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
                        // for each tag in tagArray:
                        // if tag is linked to content -> remove tag
                        // else -> add tag
                        if (tagArray && tagArray.length > 0) {
                          var updatedTagsStringUsedForDeletion = "";
                          for (var i = 0; i < tagArray.length; ++i) {
                            updatedTagsStringUsedForDeletion +=
                              "tagID=" +
                              connection.escape(tagArray[i].id) +
                              " OR ";
                            sqlQuery(i);
                            function sqlQuery(index) {
                              mysql_pool.getConnection(function (
                                err,
                                connection
                              ) {
                                connection.query(
                                  "SELECT id FROM contentTag WHERE contentTag.contentID=? AND tagID=?",
                                  [contentID, tagArray[index].id],
                                  function (err, result) {
                                    if (err) {
                                      console.log(err);
                                      connection.release();
                                      processChanges();
                                    } else {
                                      if (result[0]) {
                                        // if tag exists, do nothing
                                      } else {
                                        // tag doesn't exist, add it
                                        connection.query(
                                          "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)",
                                          [contentID, tagArray[index].id],
                                          function (err, result) {
                                            if (err) {
                                              console.log(err);
                                            }
                                            connection.release();
                                          }
                                        );
                                      }
                                    }
                                  }
                                );
                              });
                            }
                          }
                          // remove last OR from sql statement
                          updatedTagsStringUsedForDeletion =
                            updatedTagsStringUsedForDeletion.slice(0, -3);
                          mysql_pool.getConnection(function (err, connection) {
                            connection.query(
                              "DELETE FROM contentTag ct1 WHERE ct1.contentID=? AND ct1.id NOT IN (SELECT id FROM (SELECT id FROM contentTag WHERE " +
                                updatedTagsStringUsedForDeletion +
                                ")c)",
                              [contentID],
                              function (err, result) {
                                if (err) {
                                  error = "SQL Delete Error";
                                  responseCode = 500;
                                  console.log(err);
                                } else {
                                  if (result.affectedRows > 0) {
                                    responseCode = 200;
                                  } else {
                                    error =
                                      "Content with this tag does not exist";
                                  }
                                }
                                connection.release();
                              }
                            );
                          });
                        } else {
                          mysql_pool.getConnection(function (err, connection) {
                            connection.query(
                              "DELETE FROM contentTag WHERE contentID=?",
                              [contentID],
                              function (err, result) {
                                if (err) {
                                  error = "SQL Delete Error";
                                  responseCode = 500;
                                  console.log(err);
                                } else {
                                  if (result.affectedRows > 0) {
                                    responseCode = 200;
                                  } else {
                                    error = "Content does not exist";
                                  }
                                }
                                connection.release();
                              }
                            );
                          });
                        }
                        results.push("Success");
                        responseCode = 200;
                        connection.release();
                        processChanges();
                      } else {
                        error = "Content does not exist";
                        responseCode = 500;
                        console.log(error);
                        connection.release();
                        processChanges();
                      }
                    }
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
