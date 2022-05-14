// Routes for user profiles
var apiAuth = require("../auth/validateAPIKey.ts");
var express = require("express");
var router = express.Router();

const createUserProfileController = require("../controllers/userProfileControllers/createUserProfileController.ts");
const readUserProfileController = require("../controllers/userProfileControllers/readUserProfileController.ts");
const readUserProfileByUIDController = require("../controllers/userProfileControllers/readUserProfileByUIDController.ts");
const updateUserProfileController = require("../controllers/userProfileControllers/updateUserProfileController.ts");
const deleteUserProfileController = require("../controllers/userProfileControllers/deleteUserProfileController.ts");
const getUserProfilesController = require("../controllers/userProfileControllers/getUserProfilesController.ts");
const getUserProfileByUsernameController = require("../controllers/userProfileControllers/getUserProfileByUsernameController.ts");

router.post(
  "/api/createUserProfile",
  apiAuth.validateAPIKey,
  createUserProfileController.createUserProfile
);
router.post(
  "/api/readUserProfile",
  apiAuth.validateAPIKey,
  readUserProfileController.readUserProfile
);
router.post(
  "/api/readUserProfileByUID",
  apiAuth.validateAPIKey,
  readUserProfileByUIDController.readUserProfileByUID
);
router.patch(
  "/api/updateUserProfile",
  apiAuth.validateAPIKey,
  updateUserProfileController.updateUserProfile
);
router.delete(
  "/api/deleteUserProfile",
  apiAuth.validateAPIKey,
  deleteUserProfileController.deleteUserProfile
);
router.get(
  "/api/getUserProfiles",
  apiAuth.validateAPIKey,
  getUserProfilesController.getUserProfiles
);
router.post(
  "/api/getUserProfileByUsername",
  apiAuth.validateAPIKey,
  getUserProfileByUsernameController.getUserProfile
);

module.exports = router;
