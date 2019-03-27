const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateUpdated: { type: Date, default: Date.now(), required: true },
  avatar: { type: String, default: "Standard", required: true },
  aboutMe: { type: String, default: "Nothing here yet.", required: false },
  interests: { type: String, default: "Nothing here yet.", required: false }
});

const profiles = mongoose.model("profile", ProfileSchema);

module.exports = profiles;
