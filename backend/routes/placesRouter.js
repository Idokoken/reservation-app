const express = require("express");
const {
  createPlaces,
  getPlaces,
  getOnePlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placesController");

const placesRouter = express.Router();

placesRouter.post("/", createPlaces);
placesRouter.get("/", getPlaces);
placesRouter.get("/:id", getOnePlace);
placesRouter.put("/new", updatePlace);
placesRouter.delete("/:id", deletePlace);

module.exports = placesRouter;
