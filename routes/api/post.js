const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const userSchema = require("../../schemas/users.js");
const postSchema = require("../../schemas/posts.js");
const commentSchema = require("../../schemas/comments.js");

require("../../auth/jwtStrategy")(passport);

//Private route
//Shows all posts that are available - for use with global tab
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
    let query = { _id: req.user.id };

    userSchema.findOneAndUpdate(
      query,
      { $push: { friends: "Hello again!" } },
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
    let query = { _id: req.user.id };
    const newComment = new commentSchema({});
    const newPost = new postSchema({
      post: req.body.post,
      comments: [newComment]
    });
    newComment.save(err => {
      if (err) {
        res.send(`Error saving post - ${err}`);
      } else {
        newPost.save((err, data) => {
          if (err) {
            res.send(err);
          } else {
            userSchema.findOneAndUpdate(
              query,
              { $push: { userPosts: data } },
              (err, post) => {
                if (err) {
                  return res.send(err);
                }
                return res.send(post);
              }
            );
          }
        });
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
      userName: req.user.name,
      userAvatar: req.user.avatar,
      userComment: req.body.comment
    });

    let query = {
      post: req.body.mainPosterContent
    };

    postSchema.findOneAndUpdate(
      query,
      { $push: { comments: newComment } },
      err => {
        if (err) {
          return res.send(err);
        } else {
          newComment.save((err, data) => {
            if (err) {
              res.send(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  }
);

module.exports = router;
