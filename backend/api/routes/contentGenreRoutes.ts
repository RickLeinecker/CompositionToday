// Routes for content genre
var express = require("express");
var router = express.Router();

const createContentGenreController = require("../controllers/contentGenreControllers/createContentGenreController.ts");
const readContentGenreController = require("../controllers/contentGenreControllers/readContentGenreController.ts");
const updateContentGenreController = require("../controllers/contentGenreControllers/updateContentGenreController.ts");
const deleteContentGenreController = require("../controllers/contentGenreControllers/deleteContentGenreController.ts");
const getContentGenresController = require("../controllers/contentGenreControllers/getContentGenresController.ts");

router.post(
  "/api/createContentGenre",
  createContentGenreController.createContentGenre
);
router.post(
  "/api/readContentGenre",
  readContentGenreController.readContentGenre
);
router.patch(
  "/api/updateContentGenre",
  updateContentGenreController.updateContentGenre
);
router.delete(
  "/api/deleteContentGenre",
  deleteContentGenreController.deleteContentGenre
);
router.get(
  "/api/getContentGenres",
  getContentGenresController.getContentGenres
);

module.exports = router;
