// Routes for comments
var express = require("express");
var router = express.Router();

const createCommentController = require("../controllers/commentControllers/createCommentController.ts");
const readCommentController = require("../controllers/commentControllers/readCommentController.ts");
const updateCommentController = require("../controllers/commentControllers/updateCommentController.ts");
const deleteCommentController = require("../controllers/commentControllers/deleteCommentController.ts");
const getCommentsController = require("../controllers/commentControllers/getCommentsController.ts");
const approveCommentController = require("../controllers/commentControllers/approveCommentController.ts");
const getCommentsForContentController = require("../controllers/commentControllers/getCommentsForContentController.ts");

router.post("/api/createComment", createCommentController.createComment);
router.post("/api/readComment", readCommentController.readComment);
router.post(
  "/api/getCommentsForContent",
  getCommentsForContentController.getCommentsForContent
);
router.patch("/api/updateComment", updateCommentController.updateComment);
router.patch("/api/approveComment", approveCommentController.approveComment);
router.delete("/api/deleteComment", deleteCommentController.deleteComment);
router.get("/api/getComments", getCommentsController.getComments);

module.exports = router;
