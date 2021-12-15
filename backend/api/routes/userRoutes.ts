// Routes for users
var express = require("express");
var router = express.Router();

const createUserController = require("../controllers/userControllers/createUserController.ts");
const readUserController = require("../controllers/userControllers/readUserController.ts");
const updateUserController = require("../controllers/userControllers/updateUserController.ts");
const deleteUserController = require("../controllers/userControllers/deleteUserController.ts");
const getUsersController = require("../controllers/userControllers/getUsersController.ts");

router.post("/api/createUser", createUserController.createUser);
router.post("/api/readUser", readUserController.readUser);
router.patch("/api/updateUser", updateUserController.updateUser);
router.delete("/api/deleteUser", deleteUserController.deleteUser);
router.get("/api/getUsers", getUsersController.getUsers);

module.exports = router;
