// mysql connection
var { mysql_pool } = require("../../../database/database.ts");

// removeTagsFromContent
exports.removeTagsFromContent = async (req, res) => {
  // incoming: contentTagIDArray
  // outgoing: error

  var error = "";
  var results = [];
  var responseCode = 0;
  const { contentTagIDArray } = req.body;
  for (var i = 0; i < contentTagIDArray.length; ++i) {
    sqlQuery(i);
    function sqlQuery(index) {
      mysql_pool.getConnection(function (err, connection) {
        connection.query(
          "DELETE FROM contentTag WHERE id=?",
          [contentTagIDArray[index].contentTagID],
          function (err, result) {
            if (err) {
              console.log(err);
            }
            connection.release();
          }
        );
      });
    }
    results.push("Success");
    responseCode = 200;
    finishProcess();
  }
  function finishProcess() {
    // package data
    var ret = {
      result: results,
      error: error,
    };
    // send data
    res.status(responseCode).json(ret);
  }
};
