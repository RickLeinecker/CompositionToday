// Routes for specialization tags
var express = require("express");
var router = express.Router();

const createSpecializationTagController = require("../controllers/specializationTagControllers/createSpecializationTagController.ts");
const readSpecializationTagController = require("../controllers/specializationTagControllers/readSpecializationTagController.ts");
const updateSpecializationTagController = require("../controllers/specializationTagControllers/updateSpecializationTagController.ts");
const deleteSpecializationTagController = require("../controllers/specializationTagControllers/deleteSpecializationTagController.ts");
const getSpecializationTagsController = require("../controllers/specializationTagControllers/getSpecializationTagsController.ts");

router.post(
  "/api/createSpecializationTag",
  createSpecializationTagController.createSpecializationTag
);
router.post(
  "/api/readSpecializationTag",
  readSpecializationTagController.readSpecializationTag
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
