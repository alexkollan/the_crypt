"use strict";
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const secret = new Schema({
  title: {
    type: String,
    required: true,
  },
  hashedSecret: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  secretTags: {
    type: Array,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastEdit: {
    type: Date,
    default: Date.now,
  },
});

// create and export model
module.exports = mongoose.models.secretModel || mongoose.model("secretModel", secret, "_secret");
