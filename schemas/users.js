const mongoose = require("mongoose");
const profileSchema = require("./profiles");
const postSchema = require("./posts");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  dateRegistered: { type: Date, default: Date.now(), required: true },
  dateUpdated: { type: Date, default: Date.now(), required: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true },
  friends: { type: Array, default: [], required: false },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: profileSchema,
    required: true
  },
  userPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: postSchema,
      required: true
    }
  ]
});

const users = mongoose.model("user", UserSchema);

module.exports = users;
