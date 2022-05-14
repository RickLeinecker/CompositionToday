// Routes for comments
var apiAuth = require("../auth/validateAPIKey.ts");
var express = require("express");
var router = express.Router();

const createCommentController = require("../controllers/commentControllers/createCommentController.ts");
const readCommentController = require("../controllers/commentControllers/readCommentController.ts");
const updateCommentController = require("../controllers/commentControllers/updateCommentController.ts");
const deleteCommentController = require("../controllers/commentControllers/deleteCommentController.ts");
const getCommentsController = require("../controllers/commentControllers/getCommentsController.ts");
const approveCommentController = require("../controllers/commentControllers/approveCommentController.ts");
const getCommentsForContentController = require("../controllers/commentControllers/getCommentsForContentController.ts");

router.post(
  "/api/createComment",
  apiAuth.validateAPIKey,
  createCommentController.createComment
);
router.post(
  "/api/readComment",
  apiAuth.validateAPIKey,
  readCommentController.readComment
);
router.post(
  "/api/getCommentsForContent",
  apiAuth.validateAPIKey,
  getCommentsForContentController.getCommentsForContent
);
router.patch(
  "/api/updateComment",
  apiAuth.validateAPIKey,
  updateCommentController.updateComment
);
router.patch(
  "/api/approveComment",
  apiAuth.validateAPIKey,
  approveCommentController.approveComment
);
router.delete(
  "/api/deleteComment",
  apiAuth.validateAPIKey,
  deleteCommentController.deleteComment
);
router.get(
  "/api/getComments",
  apiAuth.validateAPIKey,
  getCommentsController.getComments
);

module.exports = router;
