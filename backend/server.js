// server.js - Composition Today Server

// import middleware
var express = require("express");
var cors = require("cors");
require("dotenv").config();

var userRoutes = require("./api/routes/userRoutes.ts");
var userProfileRoutes = require("./api/routes/userProfileRoutes.ts");
var contentRoutes = require("./api/routes/contentRoutes.ts");
var commentRoutes = require("./api/routes/commentRoutes.ts");
var inboxRoutes = require("./api/routes/inboxRoutes.ts");
var contentTagRoutes = require("./api/routes/contentTagRoutes.ts");
var specializationTagRoutes = require("./api/routes/specializationTagRoutes.ts");
var tagRoutes = require("./api/routes/tagRoutes.ts");
var likeRoutes = require("./api/routes/likeRoutes.ts");
var likeTypeRoutes = require("./api/routes/likeTypeRoutes.ts");
var fileRoutes = require("./api/routes/fileRoutes.ts");
var relatedProjectsRoutes = require("./api/routes/relatedProjectsRoutes.ts");

const app = express();
app.use(cors());
// wavesurfer.js cors test
// app.use(cors({ origin: "compositiontoday.net", credentials: "true" }));
// var allowedOrigins = ["http://localhost:3000", "http://compositiontoday.net"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//   })
// );
// app.use(cors({ origin: "http://compositiontoday.net", credentials: true }));
app.use(express.json());

app.use("/", userRoutes);
app.use("/", userProfileRoutes);
app.use("/", contentRoutes);
app.use("/", commentRoutes);
app.use("/", inboxRoutes);
app.use("/", contentTagRoutes);
app.use("/", specializationTagRoutes);
app.use("/", tagRoutes);
app.use("/", likeRoutes);
app.use("/", likeTypeRoutes);
app.use("/", fileRoutes);
app.use("/", relatedProjectsRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.listen(4001); // start Node + Express server on port 4000
app.listen(5000); // start Node + Express server on port 5000
