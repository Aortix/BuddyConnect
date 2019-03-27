const mongoose = require("mongoose");
const commentsSchema = require("./comments");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  datePosted: { type: Date, default: Date.now(), required: true },
  post: { type: String, default: "Initial Post. Ignore.", required: true },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: commentsSchema,
      required: true
    }
  ]
});

const posts = mongoose.model("post", PostSchema);

module.exports = posts;
