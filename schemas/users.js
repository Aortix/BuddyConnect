const mongoose = require("mongoose");
const profileSchema = require("./profiles");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true },
  dateRegistered: { type: Date, default: Date.now(), required: false },
  profile: { type: Object, ref: profileSchema },
  avatar: { type: String, default: "standard", required: false },
  friends: { type: Array, default: [], required: false },
  userPosts: { type: Array, default: [], required: false }
});

const users = mongoose.model("user", UserSchema);

module.exports = users;
