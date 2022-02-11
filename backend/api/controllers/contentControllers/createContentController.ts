// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createContent
exports.createContent = async (req, res) => {
  // incoming: uid, imageFilepathArray, contentText, location,
  // timestamp, audioFilepath, sheetMusicFilepath, contentType,
  // contentName, websiteLink, collaborators, description, mapsEnabled
  // toDate, fromDate, isDateCurrent, price, audioFilename, sheetMusicFilename
  // imageFilepath, imageFilename
  // outgoing: error

  // only accept boolean for isDateCurrent
  // note: update endpoints to enforce types for all variables
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
  } = req.body;
  // let isDateCurrentNum = 0;
  // // console.log(isDateCurrent);
  // if (isDateCurrent == "true") {
  //   isDateCurrentNum = 1;
  // }

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
            responseCode = 200;
            mysql_pool.getConnection(async function (err, connection) {
              const sqlInsert =
                "INSERT INTO content(userID,imageFilepathArray,contentName,contentText,location,timestamp,audioFilepath,sheetMusicFilepath,contentType,websiteLink,collaborators,description,mapsEnabled,toDate,fromDate,isDateCurrent,price,audioFilename,sheetMusicFilename,imageFilepath,imageFilename) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
                ],
                await function (err, result) {
                  if (err) {
                    error = err;
                    responseCode = 500;
                    console.log(err);
                  } else {
                    results.push("Success");
                    responseCode = 201;
                    finishedProcess();
                    // console.log(result);
                    // console.log("YOOOOO");
                  }
                  // package data
                  // var ret = {
                  //   result: results,
                  //   error: error,
                  // };
                  // send data
                  // res.status(responseCode).json(ret);
                  connection.release();
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
