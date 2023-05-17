const mongoose = require("mongoose");

const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  address: { type: String },
  photos: [String],
  description: { type: String },
  perks: [String],
  extraInfo: { type: String },
  checkIn: { type: Number },
  checkOut: { type: Number },
  maxGuest: { type: Number },
});

module.exports = mongoose.model("Places", placeSchema);
