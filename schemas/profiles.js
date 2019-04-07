const mongoose = require("mongoose");
const postSchema = require("./posts");
const userSchema = require("./users");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  dateUpdated: { type: Date, default: Date.now(), required: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: userSchema,
    required: true
  },
  header: { type: String, default: "Standard", required: false },
  song: { type: String, default: "Standard", required: false },
  aboutMe: { type: String, default: "Nothing here yet.", required: false },
  friends: { type: Array, default: [], required: false },
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
