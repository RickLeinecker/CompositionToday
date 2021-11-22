// Routes for likes
var express = require("express");
var router = express.Router();

const createLikeTypeController = require("../controllers/likeTypeControllers/createLikeTypeController.ts");
const readLikeTypeController = require("../controllers/likeTypeControllers/readLikeTypeController.ts");
const updateLikeTypeController = require("../controllers/likeTypeControllers/updateLikeTypeController.ts");
const deleteLikeTypeController = require("../controllers/likeTypeControllers/deleteLikeTypeController.ts");
const getLikeTypesController = require("../controllers/likeTypeControllers/getLikeTypesController.ts");

router.post("/api/createLikeType", createLikeTypeController.createLikeType);
router.post("/api/readLikeType", readLikeTypeController.readLikeType);
router.patch("/api/updateLikeType", updateLikeTypeController.updateLikeType);
router.delete("/api/deleteLikeType", deleteLikeTypeController.deleteLikeType);
router.get("/api/getLikeTypes", getLikeTypesController.getLikeTypes);

module.exports = router;
