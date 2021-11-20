// mysql connection
var { connection } = require("../../../database/database.ts");

// createLike
exports.createLike = async (req, res) => {
  // incoming: userID, timestamp, likeTypeID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { userID, timestamp, likeTypeID } = req.body;

  const sqlInsert =
    "INSERT INTO contentGenre(userID, timestamp, likeTypeID) VALUES (?,?,?)";
  connection.query(
    sqlInsert,
    [userID, timestamp, likeTypeID],
    function (err, result) {
      if (err) {
        error = "SQL Insert Error";
        responseCode = 500;
        // console.log(err);
      } else {
        results = "Success";
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
    }
  );
};
