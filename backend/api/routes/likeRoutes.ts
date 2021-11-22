// Routes for likes
var express = require("express");
var router = express.Router();

const createLikeController = require("../controllers/likeControllers/createLikeController.ts");
const readLikeController = require("../controllers/likeControllers/readLikeController.ts");
const updateLikeController = require("../controllers/likeControllers/updateLikeController.ts");
const deleteLikeController = require("../controllers/likeControllers/deleteLikeController.ts");
const getLikesController = require("../controllers/likeControllers/getLikesController.ts");

router.post("/api/createLike", createLikeController.createLike);
router.post("/api/readLike", readLikeController.readLike);
router.patch("/api/updateLike", updateLikeController.updateLike);
router.delete("/api/deleteLike", deleteLikeController.deleteLike);
router.get("/api/getLikes", getLikesController.getLikes);

module.exports = router;
