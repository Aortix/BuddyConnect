const mongoose = require("mongoose");
const postSchema = require("./posts");
const userSchema = require("./users");
const defaultHeaders = require("./../public/uploads/defaults/defaultHeaders");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateUpdated: { type: Date, default: Date.now(), required: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchema,
    required: true
  },
  name: { type: String, required: true },
  avatar: { type: String, default: "standard.png", required: true },
  header: {
    type: String,
    default: defaultHeaders[Math.floor(Math.random() * 7)],
    required: false
  },
  song: { type: String, default: "Standard", required: false },
  aboutMe: { type: String, default: "Nothing here yet.", required: false },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
      required: false
    }
  ],
  interests: { type: String, default: "Nothing here yet.", required: false },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: postSchema,
      required: false
    }
  ]
});

const profiles = mongoose.model("profile", ProfileSchema);

module.exports = profiles;
