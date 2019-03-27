const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  datePosted: { type: Date, default: Date.now(), required: true },
  userId: { type: String, default: "Initial Comment. Ignore.", required: true },
  userName: {
    type: String,
    default: "Initial Comment. Ignore.",
    required: true
  },
  userAvatar: {
    type: String,
    default: "Initial Comment. Ignore.",
    required: true
  },
  userComment: {
    type: String,
    default: "Initial Comment. Ignore.",
    required: true
  }
});

const comments = mongoose.model("comment", CommentSchema);

module.exports = comments;
