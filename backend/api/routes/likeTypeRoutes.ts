// Routes for likes
var apiAuth = require("../auth/validateAPIKey.ts");
var express = require("express");
var router = express.Router();

const createLikeTypeController = require("../controllers/likeTypeControllers/createLikeTypeController.ts");
const readLikeTypeController = require("../controllers/likeTypeControllers/readLikeTypeController.ts");
const updateLikeTypeController = require("../controllers/likeTypeControllers/updateLikeTypeController.ts");
const deleteLikeTypeController = require("../controllers/likeTypeControllers/deleteLikeTypeController.ts");
const getLikeTypesController = require("../controllers/likeTypeControllers/getLikeTypesController.ts");

router.post(
  "/api/createLikeType",
  apiAuth.validateAPIKey,
  createLikeTypeController.createLikeType
);
router.post(
  "/api/readLikeType",
  apiAuth.validateAPIKey,
  readLikeTypeController.readLikeType
);
router.patch(
  "/api/updateLikeType",
  apiAuth.validateAPIKey,
  updateLikeTypeController.updateLikeType
);
router.delete(
  "/api/deleteLikeType",
  apiAuth.validateAPIKey,
  deleteLikeTypeController.deleteLikeType
);
router.get(
  "/api/getLikeTypes",
  apiAuth.validateAPIKey,
  getLikeTypesController.getLikeTypes
);

module.exports = router;
