// Routes for tags
var apiAuth = require("../auth/validateAPIKey.ts");
var express = require("express");
var router = express.Router();

const createTagController = require("../controllers/tagControllers/createTagController.ts");
const readTagController = require("../controllers/tagControllers/readTagController.ts");
const updateTagController = require("../controllers/tagControllers/updateTagController.ts");
const deleteTagController = require("../controllers/tagControllers/deleteTagController.ts");
const getTagsController = require("../controllers/tagControllers/getTagsController.ts");
const addGenreController = require("../controllers/tagControllers/addGenreController.ts");
const removeGenreController = require("../controllers/tagControllers/removeGenreController.ts");

router.post(
  "/api/createTag",
  apiAuth.validateAPIKey,
  createTagController.createTag
);
router.post(
  "/api/addGenre",
  apiAuth.validateAPIKey,
  addGenreController.addGenre
);
router.post(
  "/api/removeGenre",
  apiAuth.validateAPIKey,
  removeGenreController.removeGenre
);
router.post("/api/readTag", apiAuth.validateAPIKey, readTagController.readTag);
router.patch(
  "/api/updateTag",
  apiAuth.validateAPIKey,
  updateTagController.updateTag
);
router.delete(
  "/api/deleteTag",
  apiAuth.validateAPIKey,
  deleteTagController.deleteTag
);
router.get("/api/getTags", apiAuth.validateAPIKey, getTagsController.getTags);

module.exports = router;
