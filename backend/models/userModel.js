const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);
