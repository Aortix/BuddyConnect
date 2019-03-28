const mongoose = require("mongoose");
const postSchema = require("./posts");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateUpdated: { type: Date, default: Date.now(), required: true },
  header: { type: String, default: "Standard", required: false },
  avatar: { type: String, default: "Standard", required: false },
  song: { type: String, default: "Standard", required: false },
  aboutMe: { type: String, default: "Nothing here yet.", required: false },
  interests: { type: String, default: "Nothing here yet.", required: false },
  userPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: postSchema,
      required: true
    }
  ]
});

const profiles = mongoose.model("profile", ProfileSchema);

module.exports = profiles;
