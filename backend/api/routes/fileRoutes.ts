// Routes for file uploads and downloads
var express = require("express");
const sharp = require("sharp");
var router = express.Router();
var multer = require("multer");
var path = require("path");
const fs = require("fs");

// uploading a file
var randomizeFilename;
const MEGABYTE = 1000000;

// upload audio
var audioStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/var/www/assets/audio");
  },
  filename: function (req, file, callback) {
    randomizeFilename = Date.now() + path.extname(file.originalname);

    callback(null, file.fieldname + "-" + randomizeFilename);
  },
});
var desiredNumberOfMegabytesForAudio = 5;
var uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: MEGABYTE * desiredNumberOfMegabytesForAudio },
  fileFilter: function (_req, file, cb) {
    checkAudioFileType(file, cb);
  },
}).single("userFile");

// upload sheetmusic
var sheetMusicStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/var/www/assets/sheetMusic");
  },
  filename: function (req, file, callback) {
    randomizeFilename = Date.now() + path.extname(file.originalname);

    callback(null, file.fieldname + "-" + randomizeFilename);
  },
});
var desiredNumberOfMegabytesForSheetMusic = 5;
var uploadSheetMusic = multer({
  storage: sheetMusicStorage,
  limits: { fileSize: MEGABYTE * desiredNumberOfMegabytesForSheetMusic },
  fileFilter: function (_req, file, cb) {
    checkSheetMusicFileType(file, cb);
  },
}).single("userFile");

// upload image
var imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/var/www/assets/images");
  },
  filename: function (req, file, callback) {
    randomizeFilename = Date.now() + path.extname(file.originalname);

    callback(null, file.fieldname + "-" + randomizeFilename);
  },
});

var desiredNumberOfMegabytesForImages = 5;
var uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: MEGABYTE * desiredNumberOfMegabytesForImages },
  fileFilter: function (_req, file, cb) {
    checkImageFileType(file, cb);
  },
}).single("userFile");

function checkAudioFileType(file, cb) {
  // Allowed ext
  const filetypes = /mpeg|mp3/;
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
function checkImageFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
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
function checkSheetMusicFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf/;
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
//   // res.set({ "Content-Type": "audio/mp3" });
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

// uploadAudio
router.post("/api/uploadAudio", function (req, res) {
  var error = "";
  var results = [];
  var responseCode;
  // console.log("THIS IS THE REQUEST: " + req);
  // console.log("End Test.");
  uploadAudio(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      error = err.message;
      responseCode = 500;
    } else if (err) {
      // An unknown error occurred when uploading.
      error = err;
      responseCode = 500;
    } else {
      // Everything went fine.
      responseCode = 200;
      console.log(req.file);
      console.log(req.file.path);
      let fileInfo = {
        filename: req.file.filename,
        filepath: "http://compositiontoday.net/audio/" + req.file.filename,
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

// uploadSheetMusic
router.post("/api/uploadSheetMusic", function (req, res) {
  var error = "";
  var results = [];
  var responseCode;
  uploadSheetMusic(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      error = err.message;
      responseCode = 500;
    } else if (err) {
      // An unknown error occurred when uploading.
      error = err;
      responseCode = 500;
    } else {
      // Everything went fine.
      responseCode = 200;
      console.log(req.file);
      console.log(req.file.path);
      let fileInfo = {
        filename: req.file.filename,
        filepath: "http://compositiontoday.net/sheetMusic/" + req.file.filename,
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

// uploadProfileImage
router.post("/api/uploadProfileImage", function (req, res) {
  var error = "";
  var results = [];
  var responseCode;
  uploadImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      error = err.message;
      responseCode = 500;
    } else if (err) {
      // An unknown error occurred when uploading.
      error = err;
      responseCode = 500;
    } else {
      // Everything went fine.
      responseCode = 200;
      console.log(req.file);
      console.log(req.file.path);
      const { filename: image } = req.file;
      var options = {
        width: 256,
        height: 256,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      };
      await sharp(req.file.path)
        .resize(options)
        .jpeg()
        .toFile(path.resolve(req.file.destination, "rs" + image));
      fs.unlinkSync(req.file.path);

      // return res.send("SUCCESS!");
      let fileInfo = {
        filename: req.file.filename,
        filepath:
          "http://compositiontoday.net/images/" + "rs" + req.file.filename,
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

// uploadImage
router.post("/api/uploadImage", function (req, res) {
  var error = "";
  var results = [];
  var responseCode;
  uploadImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      error = err.message;
      responseCode = 500;
    } else if (err) {
      // An unknown error occurred when uploading.
      error = err;
      responseCode = 500;
    } else {
      // Everything went fine.
      responseCode = 200;
      console.log(req.file);
      console.log(req.file.path);
      const { filename: image } = req.file;
      var options = {
        width: 1024,
        height: 1024,
        fit: sharp.fit.inside,
      };
      await sharp(req.file.path)
        .resize(options)
        .jpeg()
        .toFile(path.resolve(req.file.destination, "rs" + image));
      fs.unlinkSync(req.file.path);

      // return res.send("SUCCESS!");
      let fileInfo = {
        filename: req.file.filename,
        filepath:
          "http://compositiontoday.net/images/" + "rs" + req.file.filename,
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

// delete file
router.delete("/api/deleteFile", async (req, res) => {
  // incoming: filepath
  // outgoing: success or error

  let error = "";
  let results = [];
  var responseCode = 500;

  const { filepath } = req.body;

  let modifiedFilepath = filepath.split("/");
  modifiedFilepath =
    "/var/www/assets/" + modifiedFilepath[3] + "/" + modifiedFilepath[4];

  // delete a file
  fs.unlink(modifiedFilepath, (err) => {
    if (err) {
      error = "Error Deleting File";
      console.log(err);
      // package data
      var ret = {
        result: results,
        error: error,
      };
      // send data
      res.status(responseCode).json(ret);
    } else {
      responseCode = 200;
      results.push("File Successfully Deleted");
      // package data
      var ret = {
        result: results,
        error: error,
      };
      // send data
      res.status(responseCode).json(ret);
    }
  });
});

module.exports = router;
