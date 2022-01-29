// Routes for users
var express = require("express");
var router = express.Router();

const createUserController = require("../controllers/userControllers/createUserController.ts");
const createComposerController = require("../controllers/userControllers/createComposerController.ts");
const createScrapedComposerController = require("../controllers/userControllers/createScrapedComposerController.ts");
const createPublisherController = require("../controllers/userControllers/createPublisherController.ts");
const readUserController = require("../controllers/userControllers/readUserController.ts");
const readUserByUIDController = require("../controllers/userControllers/readUserByUIDController.ts");
const updateUserController = require("../controllers/userControllers/updateUserController.ts");
const deleteUserController = require("../controllers/userControllers/deleteUserController.ts");
const getUsersController = require("../controllers/userControllers/getUsersController.ts");
const getLoggedInUserController = require("../controllers/userControllers/getLoggedInUserController.ts");
const getComposersByGenreController = require("../controllers/userControllers/getComposersByGenreController.ts");
const getComposersForShowcaseController = require("../controllers/userControllers/getComposersForShowcaseController.ts");

router.post("/api/createUser", createUserController.createUser);
router.post("/api/createComposer", createComposerController.createComposer);
router.post(
  "/api/createScrapedComposer",
  createScrapedComposerController.createScrapedComposer
);
router.post("/api/createPublisher", createPublisherController.createPublisher);
router.post("/api/readUser", readUserController.readUser);
router.post("/api/readUserByUID", readUserByUIDController.readUserByUID);
router.patch("/api/updateUser", updateUserController.updateUser);
router.delete("/api/deleteUser", deleteUserController.deleteUser);
router.get("/api/getUsers", getUsersController.getUsers);
router.get(
  "/api/getComposersForShowcase",
  getComposersForShowcaseController.getComposersForShowcase
);
router.post("/api/getLoggedInUser", getLoggedInUserController.getLoggedInUser);
router.post(
  "/api/getComposersByGenre",
  getComposersByGenreController.getComposersByGenre
);

module.exports = router;
