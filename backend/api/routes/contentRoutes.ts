// Routes for content
var express = require("express");
var router = express.Router();

const createContentController = require("../controllers/contentControllers/createContentController.ts");
const readContentController = require("../controllers/contentControllers/readContentController.ts");
const updateContentController = require("../controllers/contentControllers/updateContentController.ts");
const deleteContentController = require("../controllers/contentControllers/deleteContentController.ts");
const getContentController = require("../controllers/contentControllers/getContentsController.ts");

router.post("/api/createContent", createContentController.createContent);
router.post("/api/readContent", readContentController.readContent);
router.patch("/api/updateContent", updateContentController.updateContent);
router.delete("/api/deleteContent", deleteContentController.deleteContent);
router.get("/api/getContents", getContentController.getContents);

module.exports = router;