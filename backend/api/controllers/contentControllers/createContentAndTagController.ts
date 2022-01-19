// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createContentAndTag
exports.createContentAndTag = async (req, res) => {
  // incoming: userID, imageFilepathArray, contentText, location, timestamp,
  // audioFilepath, sheetMusicFilepath, contentType, contentName, websiteLink,
  // collaborators, description, mapsEnabled, tag, toDate, fromDate, price
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;
  var contentID = -1;

  const {
    userID,
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
    tag,
    toDate,
    fromDate,
    isDateCurrent,
    price,
  } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    const sqlInsert =
      "INSERT INTO content(userID,imageFilepathArray,contentName,contentText,location,timestamp,audioFilepath,sheetMusicFilepath,contentType,websiteLink,collaborators,description,mapsEnabled,toDate,fromDate,isDateCurrent,price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [
        userID,
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
      ],
      function (err, result) {
        if (err) {
          error = err;
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
        } else {
          contentID = result.insertId;
          if (tag) {
            connection.query(
              "SELECT * FROM tag WHERE tagName=?",
              [tag],
              function (err, result) {
                if (err) {
                  error = "SQL Search Error";
                  responseCode = 500;
                  console.log(err);
                } else {
                  if (result[0]) {
                    // create content tag
                    const sqlInsert =
                      "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)";
                    connection.query(
                      sqlInsert,
                      [contentID, result[0].id],
                      function (err, result) {
                        if (err) {
                          error = "SQL Insert Error";
                          responseCode = 500;
                          console.log(err);
                        } else {
                          results.push("Success");
                          responseCode = 201;
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
                        return;
                      }
                    );
                  } else {
                    // create tag and then create content tag
                    const sqlInsert = "INSERT INTO tag(tagName) VALUES (?)";
                    connection.query(sqlInsert, [tag], function (err, result) {
                      if (err) {
                        error = "SQL Insert Error";
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
                      } else {
                        // create content tag
                        let tagID = result.insertId;
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
                            } else {
                              results.push("Success");
                              responseCode = 201;
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
                            return;
                          }
                        );
                      }
                    });
                  }
                }
              }
            );
          } else {
            // package data
            var ret = {
              result: results,
              error: error,
            };
            // send data
            res.status(200).json(ret);
            connection.release();
            return;
          }
        }
      }
    );
  });
};
