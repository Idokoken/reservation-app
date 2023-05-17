const express = require("express");
const { createPlaces, getPlaces } = require("../controllers/placesController");

const placesRouter = express.Router();

placesRouter.post("/", createPlaces);
placesRouter.get("/", getPlaces);

module.exports = placesRouter;
