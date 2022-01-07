// insertScrapedData.ts

// Inserting Scraped Data
const fetch2 = require("node-fetch");
// import json array
const composers = require("./scraped_data.json");

console.log(composers.length);

// const createScrapedComposer = async (composer) => {
//   // incoming: firstName, lastName, isPublisher, bio, websiteLink
//   // outgoing: userID
//   var obj = {
//     firstName: composer.firstName,
//     lastName: composer.lastName,
//     isPublisher: composer.isPublisher,
//     bio: composer.bio,
//     websiteLink: composer.websiteLink,
//   };
//   var js = JSON.stringify(obj);

//   try {
//     const response = await fetch2(
//       "http://compositiontoday.net/api/createScrapedComposer",
//       {
//         method: "POST",
//         body: js,
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     var txt = await response.text();
//     var res = JSON.parse(txt);

//     if (res.error.length > 0) {
//       console.log("API Error:" + res.error);
//     } else {
//       return res.result[0];
//     }
//   } catch (e) {
//     console.log(e.toString());
//   }
// };

// const createContentAndTag = async (userContent) => {
//   // incoming: contentName, contentText, contentType, location, timestamp
//   // outgoing: userID
//   var obj = {
//     userID: userContent.userID,
//     contentName: userContent.contentName,
//     contentText: userContent.contentText,
//     contentType: userContent.contentType,
//     location: userContent.location,
//     timestamp: userContent.timestamp,
//     tag: userContent.tag,
//   };
//   var js = JSON.stringify(obj);

//   try {
//     const response = await fetch2(
//       "http://compositiontoday.net/api/createContentAndTag",
//       {
//         method: "POST",
//         body: js,
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     var txt = await response.text();
//     var res = JSON.parse(txt);

//     if (res.error.length > 0) {
//       console.log("API Error:" + res.error);
//     } else {
//       return res.result[0];
//     }
//   } catch (e) {
//     console.log(e.toString());
//   }
// };

// // start inserting
// insertScrapedComposers();

// // insert scraped composers
// async function insertScrapedComposers() {
//   for (const composer of composers) {
//     const userID = await insertComposer(composer);
//     for (const content of composer.content) {
//       await insertUserContent(content);
//       // CREATE USER CONTENT
//       async function insertUserContent(content) {
//         // add userID to the user's content object
//         content.userID = userID;
//         console.log(userID);

//         // Note: new createContentAndTag endpoint created for this task
//         // create content for composer
//         await createContentAndTag(content);
//         return;
//       }
//     }

//     async function insertComposer(composerToBeInserted) {
//       // CREATE USER
//       // add userProfile info to composer
//       composerToBeInserted.composer.bio = composerToBeInserted.userProfile.bio;
//       composerToBeInserted.composer.websiteLink =
//         composerToBeInserted.userProfile.website;

//       // Note: new createScrapedComposer endpoint created for this task
//       // create the composer and the composer's profile, return userID
//       const userID = await createScrapedComposer(composerToBeInserted.composer);
//       return userID;
//     }
//   }
// }

// // ============================================================= //
// // New Endpoints Used For Inserting Scraped Composers

// // createContentAndTag
// // mysql connection
// var { mysql_pool } = require("../../../database/database.ts");

// // createContentAndTag
// exports.createContentAndTag = async (req, res) => {
//   // incoming: userID, imageFilepathArray, contentText, location, timestamp,
//   // audioFilepath, sheetMusicFilepath, contentType, contentName, websiteLink,
//   // collaborators, description, mapsEnabled, tag
//   // outgoing: error

//   var error = "";
//   var results = [];
//   var responseCode = 0;
//   var contentID = -1;

//   const {
//     userID,
//     imageFilepathArray,
//     contentName,
//     contentText,
//     location,
//     timestamp,
//     audioFilepath,
//     sheetMusicFilepath,
//     contentType,
//     websiteLink,
//     collaborators,
//     description,
//     mapsEnabled,
//     tag,
//   } = req.body;
//   mysql_pool.getConnection(function (err, connection) {
//     const sqlInsert =
//       "INSERT INTO content(userID,imageFilepathArray,contentName,contentText,location,timestamp,audioFilepath,sheetMusicFilepath,contentType,websiteLink,collaborators,description,mapsEnabled) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
//     connection.query(
//       sqlInsert,
//       [
//         userID,
//         imageFilepathArray,
//         contentName,
//         contentText,
//         location,
//         timestamp,
//         audioFilepath,
//         sheetMusicFilepath,
//         contentType,
//         websiteLink,
//         collaborators,
//         description,
//         mapsEnabled,
//       ],
//       function (err, result) {
//         if (err) {
//           error = err;
//           responseCode = 500;
//           console.log(err);
//           // package data
//           var ret = {
//             result: results,
//             error: error,
//           };
//           // send data
//           res.status(responseCode).json(ret);
//           connection.release();
//         } else {
//           contentID = result.insertId;
//           if (tag) {
//             connection.query(
//               "SELECT * FROM tag WHERE tagName=?",
//               [tag],
//               function (err, result) {
//                 if (err) {
//                   error = "SQL Search Error";
//                   responseCode = 500;
//                   console.log(err);
//                 } else {
//                   if (result[0]) {
//                     // create content tag
//                     const sqlInsert =
//                       "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)";
//                     connection.query(
//                       sqlInsert,
//                       [contentID, result[0].id],
//                       function (err, result) {
//                         if (err) {
//                           error = "SQL Insert Error";
//                           responseCode = 500;
//                           console.log(err);
//                         } else {
//                           results.push("Success");
//                           responseCode = 201;
//                           // console.log(result);
//                         }
//                         // package data
//                         var ret = {
//                           result: results,
//                           error: error,
//                         };
//                         // send data
//                         res.status(responseCode).json(ret);
//                         connection.release();
//                         return;
//                       }
//                     );
//                   } else {
//                     // create tag and then create content tag
//                     const sqlInsert = "INSERT INTO tag(tagName) VALUES (?)";
//                     connection.query(sqlInsert, [tag], function (err, result) {
//                       if (err) {
//                         error = "SQL Insert Error";
//                         responseCode = 500;
//                         console.log(err);
//                         // package data
//                         var ret = {
//                           result: results,
//                           error: error,
//                         };
//                         // send data
//                         res.status(responseCode).json(ret);
//                         connection.release();
//                       } else {
//                         // create content tag
//                         let tagID = result.insertId;
//                         const sqlInsert =
//                           "INSERT INTO contentTag(contentID, tagID) VALUES (?,?)";
//                         connection.query(
//                           sqlInsert,
//                           [contentID, tagID],
//                           function (err, result) {
//                             if (err) {
//                               error = "SQL Insert Error";
//                               responseCode = 500;
//                               console.log(err);
//                             } else {
//                               results.push("Success");
//                               responseCode = 201;
//                               // console.log(result);
//                             }
//                             // package data
//                             var ret = {
//                               result: results,
//                               error: error,
//                             };
//                             // send data
//                             res.status(responseCode).json(ret);
//                             connection.release();
//                             return;
//                           }
//                         );
//                       }
//                     });
//                   }
//                 }
//               }
//             );
//           } else {
//             // package data
//             var ret = {
//               result: results,
//               error: error,
//             };
//             // send data
//             res.status(200).json(ret);
//             connection.release();
//             return;
//           }
//         }
//       }
//     );
//   });
// };

// // createScrapedComposer
// // mysql connection
// var { mysql_pool } = require("../../../database/database.ts");

// // createScrapedComposer - creates composer, create's composer's profile, and then updates composer's userProfileID
// exports.createScrapedComposer = async (req, res) => {
//   // incoming: firstName, lastName, bio, isPublisher, websiteLink
//   // outgoing: userID or error

//   // declaring variables for errors and results
//   var error = "";
//   var results = [];
//   var responseCode = 0;
//   var privacySetting = 0;
//   var userID = -1;
//   var uid = "null";
//   // reading data from frontend
//   const { firstName, lastName, isPublisher, bio, websiteLink } = req.body;

//   // preparing MySQL string
//   var sqlInsert =
//     "INSERT INTO user(firstName, lastName, isPublisher) VALUES(?,?,?)";
//   mysql_pool.getConnection(function (err, connection) {
//     // query database, handle errors, return JSON

//     // CREATE USER
//     connection.query(
//       sqlInsert,
//       [firstName, lastName, isPublisher],
//       function (err, result) {
//         if (err) {
//           error = "Create User Error";
//           responseCode = 500;
//           console.log(err);
//         } else {
//           results = [];
//           results.push("Success");
//           userID = result.insertId;
//           responseCode = 201;
//         }
//         // package data from creating user
//         var createUserResponse = {
//           result: results,
//           error: error,
//         };
//         // if an error occurred, then send error response
//         if (createUserResponse.error.length > 0) {
//           res.status(responseCode).json(createUserResponse);
//           connection.release();
//           return;
//         } else {
//           // If the user was successfully created, then get user's id to create their profile
//           connection.release();
//           // GET USER'S ID -- NOTE: could use SELECT LAST_INSERT_ID(); but it looks unreliable after local testing;
//           // therefore, will proceed with selecting user with uid at this point to avoid bugs
//           mysql_pool.getConnection(function (err, connection) {
//             // query database, handle errors, return JSON
//             connection.query(
//               "SELECT * FROM user WHERE id=?",
//               [userID],
//               function (err, result) {
//                 if (err) {
//                   error = "SQL Search Error";
//                   responseCode = 500;
//                   console.log(err);
//                 } else {
//                   if (result[0]) {
//                     results = [];
//                     results = result;
//                     responseCode = 200;
//                   } else {
//                     error = "User does not exist";
//                     responseCode = 500;
//                   }
//                 }
//                 // package data from searching for user
//                 var readUserResponse = {
//                   result: results,
//                   error: error,
//                 };

//                 // if an error occurred, then send error response
//                 if (readUserResponse.error.length > 0) {
//                   res.status(responseCode).json(readUserResponse);
//                   connection.release();
//                   return;
//                 } else {
//                   connection.release();
//                   // ELSE, IF USER WAS SUCCESSFULLY RETRIEVED FROM THE DB, THEN CREATE PROFLILE
//                   userID = readUserResponse.result[0].id;
//                   // CREATE USER PROFILE WITH USER'S NEWLY CREATED ID
//                   mysql_pool.getConnection(function (err, connection) {
//                     const sqlInsert =
//                       "INSERT INTO userProfile(userID, privacySetting, bio, websiteLink) VALUES (?,?,?,?)";
//                     connection.query(
//                       sqlInsert,
//                       [userID, privacySetting, bio, websiteLink],
//                       function (err, result) {
//                         if (err) {
//                           error = "User Profile Creation Failed";
//                           responseCode = 500;
//                           console.log(err);
//                         } else {
//                           results = [];
//                           results.push("Success");
//                           responseCode = 201;
//                         }
//                         // package data from creating user's profile
//                         var createUserProfileResponse = {
//                           result: results,
//                           error: error,
//                         };
//                         // if an error occurred, then send error response
//                         if (createUserProfileResponse.error.length > 0) {
//                           res
//                             .status(responseCode)
//                             .json(createUserProfileResponse);
//                           connection.release();
//                           return;
//                         } else {
//                           connection.release();
//                           // IF USER PROFILE WAS SUCCESSFULLY CREATED, RETRIEVE USER'S PROFILE ID
//                           // GET USER'S PROFILE ID
//                           mysql_pool.getConnection(function (err, connection) {
//                             // query database, handle errors, return JSON
//                             connection.query(
//                               "SELECT * FROM userProfile WHERE userID=?",
//                               [userID],
//                               function (err, result) {
//                                 if (err) {
//                                   error = "SQL Search Error";
//                                   responseCode = 500;
//                                   console.log(err);
//                                 } else {
//                                   if (result[0]) {
//                                     results = [];
//                                     results = result;
//                                     responseCode = 200;
//                                   } else {
//                                     error = "User does not exist";
//                                     responseCode = 500;
//                                   }
//                                 }
//                                 // package data from searching for user
//                                 var readUserResponse = {
//                                   result: results,
//                                   error: error,
//                                 };

//                                 // if an error occurred, then send error response
//                                 if (readUserResponse.error.length > 0) {
//                                   res
//                                     .status(responseCode)
//                                     .json(readUserResponse);
//                                   connection.release();
//                                   return;
//                                 } else {
//                                   connection.release();
//                                   // IF USER PROFILE IS LOCATED, UPDATE userProfileID IN USER'S RECORD
//                                   // assign user profile id
//                                   var userProfileID =
//                                     readUserResponse.result[0].id;
//                                   // insert newly created userProfileID into user's record
//                                   mysql_pool.getConnection(function (
//                                     err,
//                                     connection
//                                   ) {
//                                     // preparing MySQL string
//                                     var sqlInsert =
//                                       "UPDATE user SET userProfileID=? WHERE id=?";
//                                     // query database, handle errors, return JSON
//                                     connection.query(
//                                       sqlInsert,
//                                       [userProfileID, userID],
//                                       function (err, result) {
//                                         if (err) {
//                                           error = "SQL Update Error";
//                                           responseCode = 500;
//                                           console.log(err);
//                                         } else {
//                                           if (result.affectedRows > 0) {
//                                             results = [];
//                                             results.push(userID);
//                                             responseCode = 200;
//                                           } else {
//                                             error = "User does not exist";
//                                             responseCode = 500;
//                                           }
//                                         }
//                                         // package data
//                                         var insertUserProfileIDResponse = {
//                                           result: results,
//                                           error: error,
//                                         };

//                                         // if we reach this line, then we have successfully completed all previous steps
//                                         // therefore, return error or result from updating the user's record
//                                         res
//                                           .status(responseCode)
//                                           .json(insertUserProfileIDResponse);
//                                         connection.release();
//                                         return;
//                                       }
//                                     );
//                                   });
//                                 }
//                               }
//                             );
//                           });
//                         }
//                       }
//                     );
//                   });
//                 }
//               }
//             );
//           });
//         }
//       }
//     );
//   });
// };
