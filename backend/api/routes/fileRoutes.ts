// Routes for file uploads and downloads
var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

// uploading a file
var randomizeFilename;
const MEGABYTE = 1000000;
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/var/www/assets/test");
  },
  filename: function (req, file, callback) {
    randomizeFilename = Date.now() + path.extname(file.originalname);

    callback(null, file.fieldname + "-" + randomizeFilename);
  },
});
var desiredNumberOfMegabytes = 5;
var upload = multer({
  storage: storage,
  limits: { fileSize: MEGABYTE * desiredNumberOfMegabytes },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single("userFile");
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mpeg|mp3|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Unsupported File Type");
  }
}
// get file (download file)
// router.get("/download", function (req, res) {
//   const file =
//     "/Users/brianmoon/Desktop/test upload/userFile-1642368955802.jpg";
//   // res.set({ "Content-Type": "image/png" });
//   res.send(file); // Set disposition and send it.
// });
// const fs = require("fs");
// const stream = require("stream");

// router.get("/download", (req, res) => {
//   const r = fs.createReadStream(
//     "/Users/brianmoon/Desktop/test upload/userFile-1642368955802.jpg"
//   ); // or any other way to get a readable stream
//   const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
//   stream.pipeline(
//     r,
//     ps, // <---- this makes a trick with stream error handling
//     (err) => {
//       if (err) {
//         console.log(err); // No such file or any other kind of error
//         return res.sendStatus(400);
//       }
//     }
//   );
//   ps.pipe(res); // <---- this makes a trick with stream error handling
// });

// upload
router.post("/api/upload", function (req, res) {
  var error = "";
  var results = [];
  var responseCode = 404;
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      error = err.message;
    } else if (err) {
      // An unknown error occurred when uploading.
      error = err;
    } else {
      // Everything went fine.
      console.log(req.file);
      console.log(req.file.path);
      let fileInfo = {
        filename: req.file.filename,
        filepath: req.file.path,
      };
      results.push(fileInfo);
    }
    // package data
    var ret = {
      result: results,
      error: error,
    };
    // send data
    res.status(responseCode).json(ret);
  });
});

module.exports = router;
