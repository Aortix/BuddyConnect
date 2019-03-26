const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const userSchema = require("../../schemas/users.js");
const postSchema = require("../../schemas/posts.js");
const commentSchema = require("../../schemas/comments.js");

require("./../../auth/jwtStrategy")(passport);

//Private route
//Shows home page for the signed in user with posts as the default
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postSchema.find({}, (err, posts) => {
      if (err) {
        res.send(`There was an error finding the posts - ${err}`);
      }
      res.send(posts);
    });
  }
);

//Private Route
//Just testing finding a specific post with an array field and updating it
router.get(
  "/find-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = {
      name: "Rebecca",
      content: "And here is something else..."
    };

    postSchema.findOneAndUpdate(
      query,
      { $push: { comments: "Hello again!" } },
      (err, post) => {
        if (err) {
          res.send(err);
        }
        return res.send(post);
      }
    );
  }
);

//Private route
//Creating a post using the post schema
router.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new postSchema({
      userId: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      content: req.body.content
    });
    newPost.save(err => {
      if (err) {
        res.send(`Error saving post - ${err}`);
      } else {
        res.send(newPost);
      }
    });
  }
);

//Private Route
//Create a comment on a post using the comment schema
router.post(
  "/create-comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newComment = new commentSchema({
      userId: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      comment: req.body.comment
    });

    let query = {
      name: req.body.mainPosterName,
      content: req.body.mainPosterContent
    };

    postSchema.findOneAndUpdate(
      query,
      { $push: { comments: newComment } },
      (err, post) => {
        if (err) {
          res.send(err);
        }
        return res.send(post);
      }
    );
  }
);

module.exports = router;
