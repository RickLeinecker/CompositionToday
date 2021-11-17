// server.js - Composition Today Server

// import middleware
const express = require("express");
const cors = require("cors");
require("dotenv").config();

var userRoutes = require("./api/routes/userRoutes.ts");
var userProfileRoutes = require("./api/routes/userProfileRoutes.ts");
var contentRoutes = require("./api/routes/contentRoutes.ts");
var commentRoutes = require("./api/routes/commentRoutes.ts");
var inboxRoutes = require("./api/routes/inboxRoutes.ts");
var contentGenreRoutes = require("./api/routes/contentGenreRoutes.ts");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", userProfileRoutes);
app.use("/", contentRoutes);
app.use("/", commentRoutes);
app.use("/", inboxRoutes);
app.use("/", contentGenreRoutes);

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

app.listen(4001); // start Node + Express server on port 4000
