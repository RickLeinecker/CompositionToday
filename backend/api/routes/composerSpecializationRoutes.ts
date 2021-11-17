// Routes for composer specializations
var express = require("express");
var router = express.Router();

const createComposerSpecializationController = require("../controllers/composerSpecializationControllers/createComposerSpecialization.ts");
const readComposerSpecializationController = require("../controllers/composerSpecializationControllers/readComposerSpecialization.ts");
const updateComposerSpecializationController = require("../controllers/composerSpecializationControllers/updateComposerSpecialization.ts");
const deleteComposerSpecializationController = require("../controllers/composerSpecializationControllers/deleteComposerSpecialization.ts");
const getComposerSpecializationsController = require("../controllers/composerSpecializationControllers/getComposerSpecializations.ts");

router.post(
  "/api/createComposerSpecialization",
  createComposerSpecializationController.createComposerSpecialization
);
router.post(
  "/api/readComposerSpecialization",
  readComposerSpecializationController.readComposerSpecialization
);
router.patch(
  "/api/updateComposerSpecialization",
  updateComposerSpecializationController.updateComposerSpecialization
);
router.delete(
  "/api/deleteComposerSpecialization",
  deleteComposerSpecializationController.deleteComposerSpecialization
);
router.get(
  "/api/getComposerSpecializations",
  getComposerSpecializationsController.getComposerSpecializations
);

module.exports = router;
