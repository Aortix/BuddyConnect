const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const userSchema = require("../../schemas/users.js");
const profileSchema = require("../../schemas/profiles.js");
const postSchema = require("../../schemas/posts.js");
const commentSchema = require("../../schemas/comments.js");

require("../../auth/jwtStrategy")(passport);

//Private route
//Shows all posts that are available - for use with global tab
router.get(
  "/global-posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postSchema
      .find({})
      .populate("comments")
      .exec((err, posts) => {
        if (err) {
          return res.send(`There was an error finding the posts - ${err}`);
        }
        return res.send(posts);
      });
  }
);

//Private Route
//Just testing finding a specific post with an array field and updating it
router.get(
  "/friends-posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      } else {
        response.friends.forEach(friends => {
          profileSchema
            .findById(friends)
            .populate("userPosts")
            .populate({ path: "userPosts", populate: { path: "comments" } })
            .exec((err, response) => {
              if (err) {
                return res.send(err);
              } else {
                return res.send(response);
              }
            });
        });
      }
    });
  }
);

//Private route
//Creating a post using the post schema
router.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = { _id: req.user.p_id };
    const newComment = new commentSchema({});
    const newPost = new postSchema({
      post: req.body.post,
      comments: [newComment]
    });
    newComment.save(err => {
      if (err) {
        return res.send(`Error saving post - ${err}`);
      } else {
        newPost.save((err, data) => {
          if (err) {
            return res.send(err);
          } else {
            profileSchema.findOneAndUpdate(
              query,
              { $push: { userPosts: data } },
              (err, post) => {
                if (err) {
                  return res.send(err);
                }
                return res.send(data);
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
              return res.send(err);
            } else {
              return res.send(data);
            }
          });
        }
      }
    );
  }
);

//Private Route
//Used to update a user's post
router.put(
  "/update-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    query = { post: req.body.initialPost };
    postSchema.findOneAndUpdate(
      query,
      { post: req.body.post },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Post has been updated!");
      }
    );
  }
);

//Private Route
//Used to update a user's comment
router.put(
  "/update-comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    query = { userComment: req.body.initialComment };
    commentSchema.findOneAndUpdate(
      query,
      { userComment: req.body.userComment },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Comment has been updated!");
      }
    );
  }
);

//Private Route
//Used to delete a user's post
router.delete(
  "/delete-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postSchema.findOne({ post: req.body.post }, (err, response) => {
      if (err) {
        return res.send(err);
      }
      let arrayOfCommentIds = response.comments;
      arrayOfCommentIds.forEach(comment => {
        commentSchema.findByIdAndDelete(comment, (err, response) => {
          console.log(response);
          if (err) {
            return res.send(err);
          } else {
            return console.log(`Comment deleted - ${response}`);
          }
        });
      });
      postSchema.findByIdAndDelete(response._id, (err, response) => {
        if (err) {
          return res.send(err);
        }
        return console.log("Posts and comments deleted!");
      });
      profileSchema.findByIdAndUpdate(
        req.user.p_id,
        { $pull: { userPosts: response._id } },
        (err, response) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send(response);
          }
        }
      );
    });
  }
);

//Private Route
//Used to delete a user's comment on a post
router.delete(
  "/delete-comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    commentSchema.findOneAndDelete(
      { userComment: req.body.userComment },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        console.log("Comment deleted!");
        let query = { post: req.body.post };
        postSchema.findOneAndUpdate(
          query,
          { $pull: { comments: response._id } },
          (err, response) => {
            if (err) {
              return res.send(err);
            } else {
              return res.send(
                "Comment deleted along with embedded comment in post!"
              );
            }
          }
        );
      }
    );
  }
);

module.exports = router;
