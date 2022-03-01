// Routes for content tags
var express = require("express");
var router = express.Router();

const createContentTagController = require("../controllers/contentTagControllers/createContentTagController.ts");
const getTagsForContentController = require("../controllers/contentTagControllers/getTagsForContentController.ts");
const updateContentTagController = require("../controllers/contentTagControllers/updateContentTagController.ts");
const deleteContentTagController = require("../controllers/contentTagControllers/deleteContentTagController.ts");
const getContentTagsController = require("../controllers/contentTagControllers/getContentTagsController.ts");
const addTagsToContentController = require("../controllers/contentTagControllers/addTagsToContentController.ts");
const removeTagsFromContentController = require("../controllers/contentTagControllers/removeTagsFromContentController.ts");

router.post(
  "/api/createContentTag",
  createContentTagController.createContentTag
);
router.post(
  "/api/addTagsToContent",
  addTagsToContentController.addTagsToContent
);
router.post(
  "/api/getTagsForContent",
  getTagsForContentController.getTagsForContent
);
router.patch(
  "/api/updateContentTag",
  updateContentTagController.updateContentTag
);
router.delete(
  "/api/deleteContentTag",
  deleteContentTagController.deleteContentTag
);
router.delete(
  "/api/removeTagsFromContent",
  removeTagsFromContentController.removeTagsFromContent
);
router.get("/api/getContentTags", getContentTagsController.getContentTags);

module.exports = router;
