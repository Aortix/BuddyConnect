const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const users = mongoose.model("user", UserSchema);

module.exports = users;
//TODO: ADD IMAGES FOR USERS
