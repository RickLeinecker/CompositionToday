// Routes for likes
var express = require("express");
var router = express.Router();

const createLikeController = require("../controllers/likeControllers/createLikeController.ts");
const createLikeForCommentController = require("../controllers/likeControllers/createLikeForCommentController.ts");
const createLikeForContentController = require("../controllers/likeControllers/createLikeForContentController.ts");
const readLikeController = require("../controllers/likeControllers/readLikeController.ts");
const updateLikeController = require("../controllers/likeControllers/updateLikeController.ts");
const deleteLikeController = require("../controllers/likeControllers/deleteLikeController.ts");
const getLikesController = require("../controllers/likeControllers/getLikesController.ts");
const getLikesForContentController = require("../controllers/likeControllers/getLikesForContentController.ts");
const getLikesForCommentController = require("../controllers/likeControllers/getLikesForCommentController.ts");
const didUserLikeContentController = require("../controllers/likeControllers/didUserLikeContentController.ts");
const getLikeCountForCommentController = require("../controllers/likeControllers/getLikeCountForCommentController.ts");
const getLikeCountForContentController = require("../controllers/likeControllers/getLikeCountForContentController.ts");
const didUserLikeCommentController = require("../controllers/likeControllers/didUserLikeCommentController.ts");
router.post("/api/createLike", createLikeController.createLike);
router.post(
  "/api/getLikeCountForContent",
  getLikeCountForContentController.getLikeCountForContent
);
router.post(
  "/api/getLikeCountForComment",
  getLikeCountForCommentController.getLikeCountForComment
);
router.post(
  "/api/createLikeForComment",
  createLikeForCommentController.createLikeForComment
);
router.post(
  "/api/createLikeForContent",
  createLikeForContentController.createLikeForContent
);
router.post(
  "/api/didUserLikeContent",
  didUserLikeContentController.didUserLikeContent
);
router.post(
  "/api/didUserLikeComment",
  didUserLikeCommentController.didUserLikeComment
);

router.post("/api/readLike", readLikeController.readLike);
router.post(
  "/api/getLikesForContent",
  getLikesForContentController.getLikesForContent
);
router.post(
  "/api/getLikesForComment",
  getLikesForCommentController.getLikesForComment
);
router.patch("/api/updateLike", updateLikeController.updateLike);
router.delete("/api/deleteLike", deleteLikeController.deleteLike);
router.get("/api/getLikes", getLikesController.getLikes);

module.exports = router;
