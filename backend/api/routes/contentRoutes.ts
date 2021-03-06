// Routes for content
var express = require("express");
var router = express.Router();

const createContentController = require("../controllers/contentControllers/createContentController.ts");
const createContentAndTagController = require("../controllers/contentControllers/createContentAndTagController.ts");
const readContentController = require("../controllers/contentControllers/readContentController.ts");
const updateContentController = require("../controllers/contentControllers/updateContentController.ts");
const deleteContentController = require("../controllers/contentControllers/deleteContentController.ts");
const getContentController = require("../controllers/contentControllers/getContentsController.ts");
const getContentByTypeController = require("../controllers/contentControllers/getContentByTypeController.ts");
const getUserContentByTypeController = require("../controllers/contentControllers/getUserContentByTypeController.ts");
const getContentByTypeInBatchesController = require("../controllers/contentControllers/getContentByTypeInBatchesController.ts");
const getHomefeedContentInBatchesController = require("../controllers/contentControllers/getHomefeedContentInBatchesController.ts");
const createContentWithTagsController = require("../controllers/contentControllers/createContentWithTagsController.ts");

router.post("/api/createContent", createContentController.createContent);
router.post(
  "/api/createContentAndTag",
  createContentAndTagController.createContentAndTag
);
router.post(
  "/api/createContentWithTags",
  createContentWithTagsController.createContentWithTags
);
router.post(
  "/api/getContentByTypeInBatches",
  getContentByTypeInBatchesController.getContentByTypeInBatches
);
router.post(
  "/api/getHomefeedContentInBatches",
  getHomefeedContentInBatchesController.getHomefeedContentInBatches
);
router.post("/api/readContent", readContentController.readContent);
router.patch("/api/updateContent", updateContentController.updateContent);
router.delete("/api/deleteContent", deleteContentController.deleteContent);
router.get("/api/getContents", getContentController.getContents);
router.post(
  "/api/getContentByType",
  getContentByTypeController.getContentByType
);
router.post(
  "/api/getUserContentByType",
  getUserContentByTypeController.getUserContentByType
);

module.exports = router;
