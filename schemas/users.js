const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  dateRegistered: { type: Date, default: Date.now(), required: true },
  dateUpdated: { type: Date, default: Date.now(), required: false },
  name: { type: String, required: true },
  avatar: { type: String, default: "standard.png", required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true }
});

const users = mongoose.model("user", UserSchema);

module.exports = users;
