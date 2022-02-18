// Routes for filter
var express = require("express");
var router = express.Router();

const Controller = require("../controllers/filterControllers/Controller.ts");

router.post("/api/getContentByDescDate", Controller.getDescDate);

module.exports = router;
