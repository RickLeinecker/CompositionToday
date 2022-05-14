// Routes for likes
var apiAuth = require("../auth/validateAPIKey.ts");
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
router.post(
  "/api/createLike",
  apiAuth.validateAPIKey,
  createLikeController.createLike
);
router.post(
  "/api/getLikeCountForContent",
  apiAuth.validateAPIKey,
  getLikeCountForContentController.getLikeCountForContent
);
router.post(
  "/api/getLikeCountForComment",
  apiAuth.validateAPIKey,
  getLikeCountForCommentController.getLikeCountForComment
);
router.post(
  "/api/createLikeForComment",
  apiAuth.validateAPIKey,
  createLikeForCommentController.createLikeForComment
);
router.post(
  "/api/createLikeForContent",
  apiAuth.validateAPIKey,
  createLikeForContentController.createLikeForContent
);
router.post(
  "/api/didUserLikeContent",
  apiAuth.validateAPIKey,
  didUserLikeContentController.didUserLikeContent
);
router.post(
  "/api/didUserLikeComment",
  apiAuth.validateAPIKey,
  didUserLikeCommentController.didUserLikeComment
);

router.post(
  "/api/readLike",
  apiAuth.validateAPIKey,
  readLikeController.readLike
);
router.post(
  "/api/getLikesForContent",
  apiAuth.validateAPIKey,
  getLikesForContentController.getLikesForContent
);
router.post(
  "/api/getLikesForComment",
  apiAuth.validateAPIKey,
  getLikesForCommentController.getLikesForComment
);
router.patch(
  "/api/updateLike",
  apiAuth.validateAPIKey,
  updateLikeController.updateLike
);
router.delete(
  "/api/deleteLike",
  apiAuth.validateAPIKey,
  deleteLikeController.deleteLike
);
router.get(
  "/api/getLikes",
  apiAuth.validateAPIKey,
  getLikesController.getLikes
);

module.exports = router;
