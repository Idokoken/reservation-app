const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await new User({ name, email, password: hashedPassword });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ msg: "invalid cridentials" });
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      res.json({ msg: "invalid cridentials" });
    }
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        // expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.cookie("token", token).json(user);
    //res.send("cookie sent");
    // res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.profile = async (req, res) => {
//   res.json("user info");
// };
