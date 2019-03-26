const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  datePosted: { type: Date, default: Date.now() },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  content: { type: String, required: true },
  comments: { type: Array, default: [] }
});

const posts = mongoose.model("post", PostSchema);

module.exports = posts;
