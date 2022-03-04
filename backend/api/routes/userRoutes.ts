// Routes for users
var express = require("express");
var router = express.Router();

const createUserController = require("../controllers/userControllers/createUserController.ts");
const createComposerController = require("../controllers/userControllers/createComposerController.ts");
const removePublisherController = require("../controllers/userControllers/removePublisherController.ts");
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
const readUserByUsernameController = require("../controllers/userControllers/readUserByUsernameController.ts");
const searchComposersController = require("../controllers/userControllers/searchComposersController.ts");
const isAdminController = require("../controllers/userControllers/isAdminController.ts");
const makeAdminController = require("../controllers/userControllers/makeAdminController.ts");
const removeAdminController = require("../controllers/userControllers/removeAdminController.ts");
const listAdminsController = require("../controllers/userControllers/listAdminsController.ts");

router.post("/api/createUser", createUserController.createUser);
router.get("/api/listAdmins", listAdminsController.listAdmins);
router.post("/api/isAdmin", isAdminController.isAdmin);
router.post("/api/makeAdmin", makeAdminController.makeAdmin);
router.delete("/api/removeAdmin", removeAdminController.removeAdmin);
router.post("/api/createComposer", createComposerController.createComposer);
router.post("/api/removePublisher", removePublisherController.removePublisher);

router.post(
  "/api/createScrapedComposer",
  createScrapedComposerController.createScrapedComposer
);
router.post("/api/searchComposers", searchComposersController.searchComposers);
router.post("/api/createPublisher", createPublisherController.createPublisher);
router.post("/api/readUser", readUserController.readUser);
router.post("/api/readUserByUID", readUserByUIDController.readUserByUID);
router.post(
  "/api/readUserByUsername",
  readUserByUsernameController.readUserByUsername
);
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
