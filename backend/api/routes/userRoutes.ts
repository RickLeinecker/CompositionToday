// Routes for users
var express = require("express");
var router = express.Router();

const createUserController = require("../controllers/userControllers/createUserController.ts");
const createComposerController = require("../controllers/userControllers/createComposerController.ts");
const createPublisherController = require("../controllers/userControllers/createPublisherController.ts");
const readUserController = require("../controllers/userControllers/readUserController.ts");
const readUserByUIDController = require("../controllers/userControllers/readUserByUIDController.ts");
const updateUserController = require("../controllers/userControllers/updateUserController.ts");
const deleteUserController = require("../controllers/userControllers/deleteUserController.ts");
const getUsersController = require("../controllers/userControllers/getUsersController.ts");
const getLoggedInUserController = require("../controllers/userControllers/getLoggedInUserController.ts");

router.post("/api/createUser", createUserController.createUser);
router.post("/api/createComposer", createComposerController.createComposer);
router.post("/api/createPublisher", createPublisherController.createPublisher);
router.post("/api/readUser", readUserController.readUser);
router.post("/api/readUserByUID", readUserByUIDController.readUserByUID);
router.patch("/api/updateUser", updateUserController.updateUser);
router.delete("/api/deleteUser", deleteUserController.deleteUser);
router.get("/api/getUsers", getUsersController.getUsers);
router.post("/api/getLoggedInUser", getLoggedInUserController.getLoggedInUser);

module.exports = router;
