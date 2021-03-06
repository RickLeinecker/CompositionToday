// Routes for specialization tags
var express = require("express");
var router = express.Router();

const createSpecializationTagController = require("../controllers/specializationTagControllers/createSpecializationTagController.ts");
const getSpecializationTagsForUserController = require("../controllers/specializationTagControllers/getSpecializationTagsForUserController.ts");
const updateSpecializationTagController = require("../controllers/specializationTagControllers/updateSpecializationTagController.ts");
const deleteSpecializationTagController = require("../controllers/specializationTagControllers/deleteSpecializationTagController.ts");
const getSpecializationTagsController = require("../controllers/specializationTagControllers/getSpecializationTagsController.ts");
const getComposerGenresController = require("../controllers/specializationTagControllers/getComposerGenresController.ts");
const assignComposerGenreController = require("../controllers/specializationTagControllers/assignComposerGenreController.ts");

router.post(
  "/api/assignComposerGenre",
  assignComposerGenreController.assignComposerGenre
);
router.post(
  "/api/createSpecializationTag",
  createSpecializationTagController.createSpecializationTag
);
router.get(
  "/api/getComposerGenres",
  getComposerGenresController.getComposerGenres
);
router.post(
  "/api/getSpecializationTagsForUser",
  getSpecializationTagsForUserController.getSpecializationTagsForUser
);
router.patch(
  "/api/updateSpecializationTag",
  updateSpecializationTagController.updateSpecializationTag
);
router.delete(
  "/api/deleteSpecializationTag",
  deleteSpecializationTagController.deleteSpecializationTag
);
router.get(
  "/api/getSpecializationTags",
  getSpecializationTagsController.getSpecializationTags
);

module.exports = router;
