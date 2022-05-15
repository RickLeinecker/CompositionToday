// Routes for content
var apiAuth = require("../auth/validateAPIKey.ts");
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

router.post(
  "/api/createContent",
  apiAuth.validateAPIKey,
  createContentController.createContent
);
router.post(
  "/api/createContentAndTag",
  apiAuth.validateAPIKey,
  createContentAndTagController.createContentAndTag
);
router.post(
  "/api/createContentWithTags",
  apiAuth.validateAPIKey,
  createContentWithTagsController.createContentWithTags
);
router.post(
  "/api/getContentByTypeInBatches",
  apiAuth.validateAPIKey,
  getContentByTypeInBatchesController.getContentByTypeInBatches
);
router.post(
  "/api/getHomefeedContentInBatches",
  apiAuth.validateAPIKey,
  getHomefeedContentInBatchesController.getHomefeedContentInBatches
);
router.post(
  "/api/readContent",
  apiAuth.validateAPIKey,
  readContentController.readContent
);
router.patch(
  "/api/updateContent",
  apiAuth.validateAPIKey,
  updateContentController.updateContent
);
router.delete(
  "/api/deleteContent",
  apiAuth.validateAPIKey,
  deleteContentController.deleteContent
);
router.get(
  "/api/getContents",
  apiAuth.validateAPIKey,
  getContentController.getContents
);
router.post(
  "/api/getContentByType",
  apiAuth.validateAPIKey,
  getContentByTypeController.getContentByType
);
router.post(
  "/api/getUserContentByType",
  apiAuth.validateAPIKey,
  getUserContentByTypeController.getUserContentByType
);

module.exports = router;
