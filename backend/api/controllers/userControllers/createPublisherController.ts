// endpoint needs to create user, create user profile, and then update user's userProfileID

// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// createPublisher - creates publisher, create's publisher's profile, and then updates publisher's userProfileID
exports.createPublisher = async (req, res) => {
  // incoming: uid (required)
  // outgoing: success or error

  // declaring variables for errors and results
  var error = "";
  var results = [];
  var responseCode = 0;
  var isPublisher = 1;
  var privacySetting = 0;
  var userID = 0;
  // reading data from frontend
  const { uid } = req.body;

  // preparing MySQL string
  var sqlInsert = "INSERT INTO user(uid, isPublisher) VALUES(?,?)";
  mysql_pool.getConnection(function (err, connection) {
    // query database, handle errors, return JSON

    // CREATE USER WITH UID FROM FIREBASE
    connection.query(sqlInsert, [uid, isPublisher], function (err, result) {
      if (err) {
        error = "Create User Error";
        responseCode = 500;
        console.log(err);
      } else {
        results = [];
        results.push("Success");
        responseCode = 201;
        // console.log(result);
      }
      // package data from creating user
      var createUserResponse = {
        result: results,
        error: error,
      };

      // if an error occurred, then send error response
      if (createUserResponse.error.length > 0) {
        res.status(responseCode).json(createUserResponse);
        return;
      } else {
        // If the user was successfully created, then get user's id to create their profile

        // GET USER'S ID -- NOTE: could use SELECT LAST_INSERT_ID(); but it looks unreliable after local testing;
        // therefore, will proceed with selecting user with uid at this point to avoid bugs
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
                  results = [];
                  results = result[0];
                  responseCode = 200;
                } else {
                  error = "User does not exist";
                  responseCode = 500;
                }
              }
              // package data from searching for user
              var readUserResponse = {
                result: results,
                error: error,
              };

              // if an error occurred, then send error response
              if (readUserResponse.error.length > 0) {
                res.status(responseCode).json(readUserResponse);
                connection.release();
                return;
              } else {
                connection.release();
                // ELSE, IF USER WAS SUCCESSFULLY RETRIEVED FROM THE DB, THEN CREATE PROFLILE
                userID = readUserResponse.result[0].id;
                // CREATE USER PROFILE WITH USER'S NEWLY CREATED ID
                mysql_pool.getConnection(function (err, connection) {
                  const sqlInsert =
                    "INSERT INTO userProfile(userID, privacySetting) VALUES (?,?)";
                  connection.query(
                    sqlInsert,
                    [userID, privacySetting],
                    function (err, result) {
                      if (err) {
                        error = "User Profile Creation Failed";
                        responseCode = 500;
                        console.log(err);
                      } else {
                        results = [];
                        results.push("Success");
                        responseCode = 201;
                        // console.log(result);
                      }
                      // package data from creating user's profile
                      var createUserProfileResponse = {
                        result: results,
                        error: error,
                      };
                      // if an error occurred, then send error response
                      if (createUserProfileResponse.error.length > 0) {
                        res
                          .status(responseCode)
                          .json(createUserProfileResponse);
                        connection.release();
                        return;
                      } else {
                        connection.release();
                        // IF USER PROFILE WAS SUCCESSFULLY CREATED, RETRIEVE USER'S PROFILE ID
                        // GET USER'S PROFILE ID
                        mysql_pool.getConnection(function (err, connection) {
                          // query database, handle errors, return JSON
                          connection.query(
                            "SELECT * FROM userProfile WHERE userID=?",
                            [userID],
                            function (err, result) {
                              if (err) {
                                error = "SQL Search Error";
                                responseCode = 500;
                                console.log(err);
                              } else {
                                if (result[0]) {
                                  results = [];
                                  results = result[0];
                                  responseCode = 200;
                                } else {
                                  error = "User does not exist";
                                  responseCode = 500;
                                }
                              }
                              // package data from searching for user
                              var readUserResponse = {
                                result: results,
                                error: error,
                              };

                              // if an error occurred, then send error response
                              if (readUserResponse.error.length > 0) {
                                res.status(responseCode).json(readUserResponse);
                                connection.release();
                                return;
                              } else {
                                connection.release();
                                // IF USER PROFILE IS LOCATED, UPDATE userProfileID IN USER'S RECORD
                                // assign user profile id
                                var userProfileID =
                                  readUserResponse.result[0].id;
                                // insert newly created userProfileID into user's record
                                mysql_pool.getConnection(function (
                                  err,
                                  connection
                                ) {
                                  // preparing MySQL string
                                  var sqlInsert =
                                    "UPDATE user SET userProfileID=? WHERE id=?";
                                  // query database, handle errors, return JSON
                                  connection.query(
                                    sqlInsert,
                                    [userProfileID, userID],
                                    function (err, result) {
                                      if (err) {
                                        error = "SQL Update Error";
                                        responseCode = 500;
                                        console.log(err);
                                      } else {
                                        if (result.affectedRows > 0) {
                                          results = [];
                                          results.push("Success");
                                          responseCode = 200;
                                        } else {
                                          error = "User does not exist";
                                          responseCode = 500;
                                        }
                                        // console.log(result);
                                      }
                                      // package data
                                      var insertUserProfileIDResponse = {
                                        result: results,
                                        error: error,
                                      };

                                      // if we reach this line, then we have successfully completed all previous steps
                                      // therefore, return error or result from updating the user's record
                                      res
                                        .status(responseCode)
                                        .json(insertUserProfileIDResponse);
                                      connection.release();
                                      return;
                                    }
                                  );
                                });
                              }
                            }
                          );
                        });
                      }
                    }
                  );
                });
              }
            }
          );
        });
      }
    });
    // send data
    // res.status(responseCode).json(ret);
  });
};
