// Routes for user profiles
var express = require("express");
var router = express.Router();

const createUserProfileController = require("../controllers/userProfileControllers/createUserProfileController.ts");
const readUserProfileController = require("../controllers/userProfileControllers/readUserProfileController.ts");
const updateUserProfileController = require("../controllers/userProfileControllers/updateUserProfileController.ts");
const deleteUserProfileController = require("../controllers/userProfileControllers/deleteUserProfileController.ts");
const getUserProfilesController = require("../controllers/userProfileControllers/getUserProfilesController.ts");

router.post(
  "/api/createUserProfile",
  createUserProfileController.createUserProfile
);
router.post("/api/readUserProfile", readUserProfileController.readUserProfile);
router.patch(
  "/api/updateUserProfile",
  updateUserProfileController.updateUserProfile
);
router.delete(
  "/api/deleteUserProfile",
  deleteUserProfileController.deleteUserProfile
);
router.get("/api/getUserProfiles", getUserProfilesController.getUserProfiles);

module.exports = router;
