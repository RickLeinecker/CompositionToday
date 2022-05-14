// Routes for content tags
var apiAuth = require("../auth/validateAPIKey.ts");
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
  apiAuth.validateAPIKey,
  createContentTagController.createContentTag
);
router.post(
  "/api/addTagsToContent",
  apiAuth.validateAPIKey,
  addTagsToContentController.addTagsToContent
);
router.post(
  "/api/getTagsForContent",
  apiAuth.validateAPIKey,
  getTagsForContentController.getTagsForContent
);
router.patch(
  "/api/updateContentTag",
  apiAuth.validateAPIKey,
  updateContentTagController.updateContentTag
);
router.delete(
  "/api/deleteContentTag",
  apiAuth.validateAPIKey,
  deleteContentTagController.deleteContentTag
);
router.delete(
  "/api/removeTagsFromContent",
  apiAuth.validateAPIKey,
  removeTagsFromContentController.removeTagsFromContent
);
router.get(
  "/api/getContentTags",
  apiAuth.validateAPIKey,
  getContentTagsController.getContentTags
);

module.exports = router;
