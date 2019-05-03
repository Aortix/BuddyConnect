const mongoose = require("mongoose");
const profileSchema = require("./profiles");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  datePosted: { type: Date, default: Date.now(), required: true },
  commenterP_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: profileSchema,
    required: true
  },
  commenterName: {
    type: String,
    default: "Initial Comment. Ignore.",
    required: true
  },
  commenterAvatar: {
    type: String,
    default: "standard.png",
    required: true
  },
  commenterComment: {
    type: String,
    default: "Initial Comment. Ignore.",
    required: true
  }
});

const comments = mongoose.model("comment", CommentSchema);

module.exports = comments;
