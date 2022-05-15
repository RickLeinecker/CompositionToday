// Routes for inbox entries
var apiAuth = require("../auth/validateAPIKey.ts");
var express = require("express");
var router = express.Router();

const createInboxEntryController = require("../controllers/inboxControllers/createInboxEntryController.ts");
const readInboxEntryController = require("../controllers/inboxControllers/readInboxEntryController.ts");
const updateInboxEntryController = require("../controllers/inboxControllers/updateInboxEntryController.ts");
const deleteInboxEntryController = require("../controllers/inboxControllers/deleteInboxEntryController.ts");
const getInboxEntriesController = require("../controllers/inboxControllers/getInboxEntriesController.ts");

router.post(
  "/api/createInboxEntry",
  apiAuth.validateAPIKey,
  createInboxEntryController.createInboxEntry
);
router.post(
  "/api/readInboxEntry",
  apiAuth.validateAPIKey,
  readInboxEntryController.readInboxEntry
);
router.patch(
  "/api/updateInboxEntry",
  apiAuth.validateAPIKey,
  updateInboxEntryController.updateInboxEntry
);
router.delete(
  "/api/deleteInboxEntry",
  apiAuth.validateAPIKey,
  deleteInboxEntryController.deleteInboxEntry
);
router.get(
  "/api/getInboxEntries",
  apiAuth.validateAPIKey,
  getInboxEntriesController.getInboxEntries
);

module.exports = router;
