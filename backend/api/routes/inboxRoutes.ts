// Routes for inbox entries
var express = require("express");
var router = express.Router();

const createInboxEntryController = require("../controllers/inboxControllers/createInboxEntryController.ts");
const readInboxEntryController = require("../controllers/inboxControllers/readInboxEntryController.ts");
const updateInboxEntryController = require("../controllers/inboxControllers/updateInboxEntryController.ts");
const deleteInboxEntryController = require("../controllers/inboxControllers/deleteInboxEntryController.ts");
const getInboxEntriesController = require("../controllers/inboxControllers/getInboxEntriesController.ts");

router.post(
  "/api/createInboxEntry",
  createInboxEntryController.createInboxEntry
);
router.post("/api/readInboxEntry", readInboxEntryController.readInboxEntry);
router.patch(
  "/api/updateInboxEntry",
  updateInboxEntryController.updateInboxEntry
);
router.delete(
  "/api/deleteInboxEntry",
  deleteInboxEntryController.deleteInboxEntry
);
router.get("/api/getInboxEntries", getInboxEntriesController.getInboxEntries);

module.exports = router;
