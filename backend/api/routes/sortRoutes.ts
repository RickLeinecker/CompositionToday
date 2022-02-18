// Routes for filter
var express = require("express");
var router = express.Router();

const descendingDateController = require("../controllers/filterControllers/descDateController.ts");

router.post("/api/getContentByDescDate", descendingDateController.getDescDate);

module.exports = router;
