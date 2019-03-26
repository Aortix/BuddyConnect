const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateUpdated: { type: Date, default: Date.now() },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  aboutMe: { type: String, default: "Nothing here yet." },
  interests: { type: String, default: "Nothing here yet." },
  friends: { type: Array, default: [] }
});

const profiles = mongoose.model("profile", ProfileSchema);

module.exports = profiles;
