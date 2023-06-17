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
    // const userInfo = await jwt.verify(token, process.env.JWT_SECRET, {});
    // const places = await Places.find({ owner: userInfo.id });
    const places = await Places.find();
    // console.log(token);
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOnePlace = async (req, res) => {
  try {
    const place = await Places.findById(req.params.id);
    // console.log(place);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePlace = async (req, res) => {
  const {
    id,
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

  // jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
  const placesDoc = await Places.findById(id);
  console.log(token);
  console.log(placesDoc.owner);
  // if (userData.id === placesDoc.owner) {
  //   placesDoc.set({
  //     title,
  //     address,
  //     photos,
  //     description,
  //     perks,
  //     checkIn,
  //     checkOut,
  //     maxGuest,
  //   });
  //   await placesDoc.save();
  // res.json("ok");
  // }

  // });

  // const place = Places.findByIdAndUpdate(
  //   {
  //     title,
  //     address,
  //     photos,
  //     description,
  //     perks,
  //     checkIn,
  //     checkOut,
  //     maxGuest,
  //   },
  //   { new: true }
  // );
  // console.log(place);
  // res.status(200).json(place);
};

exports.deletePlace = async (req, res) => {
  try {
    await Places.findByIdAndDelete(req.params.id);
    res.status(200).json("Place deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
