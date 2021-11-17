// mysql connection
var { connection } = require("../../../database/database.ts");

// updateInboxEntry
exports.updateInboxEntry = async (req, res) => {
  // incoming: inboxEntryID, contentID, profileID, requesterID, commentID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { inboxEntryID, contentID, profileID, requesterID, commentID } =
    req.body;

  var sqlInsert =
    "UPDATE userProfile SET userId=?,bio=?,specialization=?,location=?,displayName=? WHERE id=?";

  connection.query(
    sqlInsert,
    [contentID, profileID, requesterID, commentID, inboxEntryID],
    function (err, result) {
      if (err) {
        error = "SQL Update Error";
        responseCode = 500;
        // console.log(err);
      } else {
        if (result.affectedRows > 0) {
          results = "Success";
          responseCode = 200;
        } else {
          error = "Inbox entry does not exist";
          responseCode = 500;
        }
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
