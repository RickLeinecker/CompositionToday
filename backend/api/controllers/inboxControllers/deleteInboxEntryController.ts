// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// deleteInboxEntry
exports.deleteInboxEntry = async (req, res) => {
  // incoming: inboxEntryID
  // outgoing: error

  var error = "";
  var results = "";
  var responseCode = 0;

  const { inboxEntryID } = req.body;
  mysql_pool.getConnection(function (err, connection) {
    connection.query(
      "DELETE FROM inbox WHERE id=?",
      [inboxEntryID],
      function (err, result) {
        if (err) {
          error = "SQL Delete Error";
          // console.log(err);
        } else {
          if (result.affectedRows > 0) {
            results = "Success";
          } else {
            error = "Inbox entry does not exist";
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
  });
};
