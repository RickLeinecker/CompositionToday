// Routes for likes
var apiAuth = require("../auth/validateAPIKey.ts");
var express = require("express");
var router = express.Router();

const addProjectController = require("../controllers/relatedProjectsControllers/addProjectController.ts");
const editProjectController = require("../controllers/relatedProjectsControllers/editProjectController.ts");
const removeProjectController = require("../controllers/relatedProjectsControllers/removeProjectController.ts");
const getProjectsController = require("../controllers/relatedProjectsControllers/getProjectsController.ts");

router.post(
  "/api/addProject",
  apiAuth.validateAPIKey,
  addProjectController.addProject
);
router.patch(
  "/api/editProject",
  apiAuth.validateAPIKey,
  editProjectController.editProject
);
router.delete(
  "/api/removeProject",
  apiAuth.validateAPIKey,
  removeProjectController.removeProject
);
router.get(
  "/api/getProjects",
  apiAuth.validateAPIKey,
  getProjectsController.getProjects
);

module.exports = router;
