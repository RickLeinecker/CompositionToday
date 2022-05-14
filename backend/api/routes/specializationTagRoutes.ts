// Routes for specialization tags
var apiAuth = require("../auth/validateAPIKey.ts");
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
  apiAuth.validateAPIKey,
  assignComposerGenreController.assignComposerGenre
);
router.post(
  "/api/createSpecializationTag",
  apiAuth.validateAPIKey,
  createSpecializationTagController.createSpecializationTag
);
router.get(
  "/api/getComposerGenres",
  apiAuth.validateAPIKey,
  getComposerGenresController.getComposerGenres
);
router.post(
  "/api/getSpecializationTagsForUser",
  apiAuth.validateAPIKey,
  getSpecializationTagsForUserController.getSpecializationTagsForUser
);
router.patch(
  "/api/updateSpecializationTag",
  apiAuth.validateAPIKey,
  updateSpecializationTagController.updateSpecializationTag
);
router.delete(
  "/api/deleteSpecializationTag",
  apiAuth.validateAPIKey,
  deleteSpecializationTagController.deleteSpecializationTag
);
router.get(
  "/api/getSpecializationTags",
  apiAuth.validateAPIKey,
  getSpecializationTagsController.getSpecializationTags
);

module.exports = router;
