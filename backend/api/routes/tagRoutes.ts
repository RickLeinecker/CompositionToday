// Routes for tags
var express = require("express");
var router = express.Router();

const createTagController = require("../controllers/tagControllers/createTagController.ts");
const readTagController = require("../controllers/tagControllers/readTagController.ts");
const updateTagController = require("../controllers/tagControllers/updateTagController.ts");
const deleteTagController = require("../controllers/tagControllers/deleteTagController.ts");
const getTagsController = require("../controllers/tagControllers/getTagsController.ts");
const addGenreController = require("../controllers/tagControllers/addGenreController.ts");
const removeGenreController = require("../controllers/tagControllers/removeGenreController.ts");

router.post("/api/createTag", createTagController.createTag);
router.post("/api/addGenre", addGenreController.addGenre);
router.post("/api/removeGenre", removeGenreController.removeGenre);
router.post("/api/readTag", readTagController.readTag);
router.patch("/api/updateTag", updateTagController.updateTag);
router.delete("/api/deleteTag", deleteTagController.deleteTag);
router.get("/api/getTags", getTagsController.getTags);

module.exports = router;
