const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const userSchema = require("../../schemas/users.js");
const profileSchema = require("../../schemas/profiles.js");
const postSchema = require("../../schemas/posts.js");
const commentSchema = require("../../schemas/comments.js");

const postValidation = require("../../validation/postValidation");
const commentValidation = require("../../validation/commentValidation");

const isEmpty = require("../../client/src/utilities/isEmpty");
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
      .sort({ datePosted: "desc" })
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
    let returnArray = [];
    profileSchema.findOne({ user: req.user.id }, (err, response) => {
      if (err) {
        return res.send(err);
      } else {
        response.friends.forEach(friends => {
          returnArray.push(friends.toString());
        });
        returnArray.push(response._id.toString());
        postSchema
          .find({})
          .populate("comments")
          .sort({ datePosted: "desc" })
          .exec((err, response3) => {
            if (err) {
              return res.send(err);
            } else {
              let newArray = response3.filter(posts => {
                return returnArray.includes(posts.p_id.toString());
              });
              return res.send(newArray);
            }
          });
      }
    });
  }
);

router.post(
  "/profile-posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let returnArray = [];
    profileSchema.findById(req.body.profileId).exec((err, profile) => {
      if (err) {
        return res.send(`There was an error finding the posts - ${err}`);
      } else {
        profile.posts.forEach(posts => {
          returnArray.push(posts.toString());
        });
        postSchema
          .find({})
          .populate("comments")
          .sort({ datePosted: "desc" })
          .exec((err, response) => {
            if (err) {
              return res.send(err);
            } else {
              let newArray = response.filter(posts => {
                return returnArray.includes(posts._id.toString());
              });
              return res.send(newArray);
            }
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
    const errors = postValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    profileSchema.findOne({ user: req.user.id }, (err, response) => {
      if (err) {
        errors.misc = "Cannot find profile for this user.";
        return res.status(500).send(errors.errors);
      } else {
        const newPost = new postSchema({
          p_id: response._id,
          name: response.name,
          avatar: response.avatar,
          post: req.body.post,
          datePosted: req.body.datePosted
        });

        newPost.save((err, data) => {
          if (err) {
            errors.misc = "Cannot save this post due to server error.";
            return res.status(500).send(errors.errors);
          } else {
            profileSchema.findByIdAndUpdate(
              response._id,
              { $push: { posts: data } },
              (err, post) => {
                if (err) {
                  errors.misc =
                    "Cannot update profile with this post due to server error.";
                  return res.status(500).send(errors.errors);
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

//Private route
//Creating a post ON SOMEONE ELSES PROFILE using the post schema
router.post(
  "/create-post-on-different-profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = postValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    profileSchema.findOne({ user: req.user.id }, (err, response) => {
      if (err) {
        errors.misc = "Cannot find specific profile to make post.";
        return res.status(500).send(errors.errors);
      } else {
        const newPost = new postSchema({
          p_id: response._id,
          name: response.name,
          avatar: response.avatar,
          post: req.body.post,
          datePosted: req.body.datePosted
        });

        newPost.save((err, data) => {
          if (err) {
            errors.misc = "Cannot save the post due to server error.";
            return res.status(500).send(errors.errors);
          } else {
            profileSchema.findByIdAndUpdate(
              req.body.profileId,
              { $push: { posts: data } },
              (err, post) => {
                if (err) {
                  errors.misc = "Cannot update the profile with the post.";
                  return res.status(500).send(errors.errors);
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
    const errors = commentValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    profileSchema.findOne({ user: req.user.id }, (err, response) => {
      if (err) {
        errors.misc = "Cannot find profile for this comment on the server.";
        return res.status(500).send(errors);
      } else {
        userSchema.findById(req.user.id, (err, response2) => {
          if (err) {
            errors.misc =
              "Cannot find the user for this comment on the server.";
            return res.status(500).send(errors);
          } else {
            const newComment = new commentSchema({
              commenterP_id: response._id,
              commenterName: response2.name,
              commenterAvatar: response2.avatar,
              commenterComment: req.body.comment,
              datePosted: req.body.datePosted
            });
            postSchema.findByIdAndUpdate(
              req.body.post,
              { $push: { comments: newComment } },
              err => {
                if (err) {
                  errors.misc =
                    "Cannot update the profile of the user who made this comment.";
                  return res.status(500).send(errors);
                } else {
                  newComment.save((err, data) => {
                    if (err) {
                      errors.misc = "Cannot save the comment in the database.";
                      return res.status(500).send(errors);
                    } else {
                      console.log("Comment was added!");
                      return res.send(data);
                    }
                  });
                }
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
router.put(
  "/click-add_comment-button",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postSchema.findById(req.body.postId, (err, dataToUpdate) => {
      if (err) {
        return res.send(err);
      } else {
        dataToUpdate.addComment = !dataToUpdate.addComment;
        dataToUpdate.save((err, updatedData) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send("Add comment button clicked");
          }
        });
      }
    });
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
router.put(
  "/delete-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postSchema.findById(req.body.postId, (err, response) => {
      if (err) {
        return res.send(err);
      }
      let arrayOfCommentIds = response.comments;
      arrayOfCommentIds.forEach(comment => {
        commentSchema.findByIdAndDelete(comment, (err, response2) => {
          if (err) {
            return res.send(err);
          } else {
            return console.log("Comment Deleted");
          }
        });
      });
      postSchema.findByIdAndDelete(req.body.postId, (err, response3) => {
        if (err) {
          return res.send(err);
        }
        return console.log("Post deleted.");
      });
      profileSchema.findByIdAndUpdate(
        response.p_id,
        { $pull: { posts: response._id } },
        (err, response4) => {
          if (err) {
            return res.send(err);
          } else {
            console.log("Post from profile deleted.");
            return res.send(response4);
          }
        }
      );
    });
  }
);

//Private Route
//Used to delete a user's comment on a post
router.put(
  "/delete-comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    commentSchema.findByIdAndDelete(req.body.commentId, (err, response) => {
      if (err) {
        return res.send(err);
      }
      console.log("Comment deleted!");
      postSchema.findByIdAndUpdate(
        req.body.postId,
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
    });
  }
);

module.exports = router;
