// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createContentWithTags
exports.createContentWithTags = async (req, res) => {
  // incoming: uid, imageFilepathArray, contentText, location,
  // timestamp, audioFilepath, sheetMusicFilepath, contentType,
  // contentName, websiteLink, collaborators, description, mapsEnabled
  // toDate, fromDate, isDateCurrent, price, audioFilename, sheetMusicFilename
  // imageFilepath, imageFilename, tagArray, isFeaturedSong, isContest
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;

  const {
    uid,
    imageFilepathArray,
    contentName,
    contentText,
    location,
    timestamp,
    audioFilepath,
    sheetMusicFilepath,
    contentType,
    websiteLink,
    collaborators,
    description,
    mapsEnabled,
    toDate,
    fromDate,
    isDateCurrent,
    price,
    audioFilename,
    sheetMusicFilename,
    imageFilepath,
    imageFilename,
    tagArray,
    isFeaturedSong,
    isContest,
  } = req.body;

  mysql_pool.getConnection(async function (err, connection) {
    // query database, handle errors, return JSON
    connection.query(
      "SELECT * FROM user WHERE uid=?",
      [uid],
      await function (err, result) {
        if (err) {
          error = "SQL Search Error";
          responseCode = 500;
          console.log(err);
        } else {
          if (result[0]) {
            var userID = result[0].id;
            responseCode = 200;
            mysql_pool.getConnection(async function (err, connection) {
              const sqlInsert =
                "INSERT INTO content(userID,imageFilepathArray,contentName,contentText,location,timestamp,audioFilepath,sheetMusicFilepath,contentType,websiteLink,collaborators,description,mapsEnabled,toDate,fromDate,isDateCurrent,price,audioFilename,sheetMusicFilename,imageFilepath,imageFilename,isFeaturedSong,isContest) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
              connection.query(
                sqlInsert,
                [
                  result[0].id,
                  imageFilepathArray,
                  contentName,
                  contentText,
                  location,
                  timestamp,
                  audioFilepath,
                  sheetMusicFilepath,
                  contentType,
                  websiteLink,
                  collaborators,
                  description,
                  mapsEnabled,
                  toDate,
                  fromDate,
                  isDateCurrent,
                  price,
                  audioFilename,
                  sheetMusicFilename,
                  imageFilepath,
                  imageFilename,
                  isFeaturedSong,
                  isContest,
                ],
                await function (err, result) {
                  if (err) {
                    error = err;
                    responseCode = 500;
                    console.log(err);
                    finishedProcess();
                  } else {
                    // isFeaturedSong === 1, then remove isFeaturedSong from user's other featured song
                    if (isFeaturedSong === true || isFeaturedSong === 1) {
                      mysql_pool.getConnection(function (err, connection) {
                        connection.query(
                          "SELECT * FROM content WHERE userID=? AND isFeaturedSong=1;",
                          [userID],
                          function (err, resultForUpdate) {
                            if (err) {
                              console.log(err);
                            } else {
                              if (resultForUpdate[0]) {
                                mysql_pool.getConnection(function (
                                  err,
                                  connection
                                ) {
                                  connection.query(
                                    "UPDATE content SET isFeaturedSong=0 WHERE id=?",
                                    [resultForUpdate[0].id],
                                    function (err, resultAfterUpdate) {
                                      if (err) {
                                        console.log(err);
                                      } else {
                                        if (
                                          resultAfterUpdate.affectedRows > 0
                                        ) {
                                          // success
                                        } else {
                                          console.log(
                                            "Content does not exists"
                                          );
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
                    // add tags from tagArray
                    var contentID = result.insertId;
                    console.log(contentID);
                    for (var i = 0; i < tagArray.length; ++i) {
                      console.log(tagArray[i].id);
                      sqlQuery(tagArray[i].id);
                      async function sqlQuery(tagID) {
                        mysql_pool.getConnection(function (err, connection) {
                          const sqlInsert =
                            "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)";
                          connection.query(
                            sqlInsert,
                            [contentID, tagID],
                            function (err, result) {
                              if (err) {
                                error = "SQL Insert Error";
                                responseCode = 500;
                                console.log(err);
                                connection.release();
                                finishedProcess();
                              }
                              connection.release();
                            }
                          );
                        });
                      }
                    }
                  }
                  results.push("Success");
                  responseCode = 201;
                  connection.release();
                  finishedProcess();
                }
              );
            });
          } else {
            error = "User does not exist";
            responseCode = 500;
            finishedProcess();
          }
          function finishedProcess() {
            // package data
            var ret = {
              result: results,
              error: error,
            };
            // send data
            res.status(responseCode).json(ret);
          }
        }

        connection.release();
      }
    );
  });
};
