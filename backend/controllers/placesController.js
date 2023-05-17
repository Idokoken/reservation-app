const express = require("express");
const Places = require("../models/placeModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.createPlaces = async (req, res) => {
  const {
    title,
    address,
    photos,
    description,
    perks,
    checkIn,
    checkOut,
    maxGuest,
  } = req.body;

  const { token } = req.cookies;

  try {
    const userInfo = await jwt.verify(token, process.env.JWT_SECRET, {});
    const places = await new Places({
      owner: userInfo.id,
      title,
      address,
      photos,
      description,
      perks,
      checkIn,
      checkOut,
      maxGuest,
    });
    const newPlaces = await places.save();
    res.status(200).json(newPlaces);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPlaces = async (req, res) => {
  const { token } = req.cookies;
  try {
    const userInfo = await jwt.verify(token, process.env.JWT_SECRET, {});
    const places = await Places.find({ owner: userInfo.id });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};
