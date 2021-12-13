"use strict";
// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const secret = new Schema({
  hashedSecret: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

// create and export model
module.exports = mongoose.models.otsecretModel || mongoose.model("otsecretModel", secret, "_oneTime_secrets");
