// Routes for content tags
var express = require("express");
var router = express.Router();

const createContentTagController = require("../controllers/contentTagControllers/createContentTagController.ts");
const getContentTagsForContentController = require("../controllers/contentTagControllers/getContentTagsForContentController.ts");
const updateContentTagController = require("../controllers/contentTagControllers/updateContentTagController.ts");
const deleteContentTagController = require("../controllers/contentTagControllers/deleteContentTagController.ts");
const getContentTagsController = require("../controllers/contentTagControllers/getContentTagsController.ts");

router.post(
  "/api/createContentTag",
  createContentTagController.createContentTag
);
router.post(
  "/api/getContentTagsForContent",
  getContentTagsForContentController.getContentTagsForContent
);
router.patch(
  "/api/updateContentTag",
  updateContentTagController.updateContentTag
);
router.delete(
  "/api/deleteContentTag",
  deleteContentTagController.deleteContentTag
);
router.get("/api/getContentTags", getContentTagsController.getContentTags);

module.exports = router;
