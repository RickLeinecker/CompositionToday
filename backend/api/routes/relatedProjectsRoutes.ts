// Routes for likes
var express = require("express");
var router = express.Router();

const addProjectController = require("../controllers/relatedProjectsControllers/addProjectController.ts");
const editProjectController = require("../controllers/relatedProjectsControllers/editProjectController.ts");
const removeProjectController = require("../controllers/relatedProjectsControllers/removeProjectController.ts");
const getProjectsController = require("../controllers/relatedProjectsControllers/getProjectsController.ts");

router.post("/api/addProject", addProjectController.addProject);
router.patch("/api/editProject", editProjectController.editProject);
router.delete("/api/removeProject", removeProjectController.removeProject);
router.get("/api/getProjects", getProjectsController.getProjects);

module.exports = router;
