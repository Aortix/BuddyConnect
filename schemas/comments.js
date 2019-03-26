const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  datePosted: { type: Date, default: Date.now() },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  comment: { type: String, required: true }
});

const comments = mongoose.model("comment", CommentSchema);

module.exports = comments;
