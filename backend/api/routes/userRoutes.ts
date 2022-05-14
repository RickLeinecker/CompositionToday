// Routes for users
var apiAuth = require("../auth/validateAPIKey.ts");
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

router.post(
  "/api/createUser",
  apiAuth.validateAPIKey,
  createUserController.createUser
);
router.get(
  "/api/listAdmins",
  apiAuth.validateAPIKey,
  listAdminsController.listAdmins
);
router.post("/api/isAdmin", apiAuth.validateAPIKey, isAdminController.isAdmin);
router.post(
  "/api/makeAdmin",
  apiAuth.validateAPIKey,
  makeAdminController.makeAdmin
);
router.delete(
  "/api/removeAdmin",
  apiAuth.validateAPIKey,
  removeAdminController.removeAdmin
);
router.post(
  "/api/createComposer",
  apiAuth.validateAPIKey,
  createComposerController.createComposer
);
router.post(
  "/api/removePublisher",
  apiAuth.validateAPIKey,
  removePublisherController.removePublisher
);

router.post(
  "/api/createScrapedComposer",
  apiAuth.validateAPIKey,
  createScrapedComposerController.createScrapedComposer
);
router.post(
  "/api/searchComposers",
  apiAuth.validateAPIKey,
  searchComposersController.searchComposers
);
router.post(
  "/api/createPublisher",
  apiAuth.validateAPIKey,
  createPublisherController.createPublisher
);
router.post(
  "/api/readUser",
  apiAuth.validateAPIKey,
  readUserController.readUser
);
router.post(
  "/api/readUserByUID",
  apiAuth.validateAPIKey,
  readUserByUIDController.readUserByUID
);
router.post(
  "/api/readUserByUsername",
  apiAuth.validateAPIKey,
  readUserByUsernameController.readUserByUsername
);
router.patch(
  "/api/updateUser",
  apiAuth.validateAPIKey,
  updateUserController.updateUser
);
router.delete(
  "/api/deleteUser",
  apiAuth.validateAPIKey,
  deleteUserController.deleteUser
);
router.get(
  "/api/getUsers",
  apiAuth.validateAPIKey,
  getUsersController.getUsers
);
router.get(
  "/api/getComposersForShowcase",
  apiAuth.validateAPIKey,
  getComposersForShowcaseController.getComposersForShowcase
);
router.post(
  "/api/getLoggedInUser",
  apiAuth.validateAPIKey,
  getLoggedInUserController.getLoggedInUser
);
router.post(
  "/api/getComposersByGenre",
  apiAuth.validateAPIKey,
  getComposersByGenreController.getComposersByGenre
);

module.exports = router;
