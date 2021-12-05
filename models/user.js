"use strict";
// Import mongoose
import mongoose from "mongoose";

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  userKey: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

// create and export model
module.exports = mongoose.models.userModel || mongoose.model("userModel", user, "_users");
