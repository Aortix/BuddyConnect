const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ColorSchema = new Schema({
  dateUpdated: { type: Date, default: Date.now(), required: true },
  navBarColor: { type: String, default: "Standard", required: false },
  backgroundColor: { type: String, default: "Standard", required: false },
  primaryColor: { type: String, default: "Standard", required: false },
  accentColor: { type: String, default: "Standard", required: false },
  textColor: { type: String, default: "Standard", required: false }
});

const colors = mongoose.model("color", ColorSchema);

module.exports = colors;
