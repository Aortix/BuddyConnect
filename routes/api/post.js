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
const profileValidation = require("./../../validation/profileValidation");

require("../../auth/jwtStrategy")(passport);

mongoose.Promise = global.Promise;

//Private route
//Shows all posts that are available - for use with global tab
router.post(
  "/global-posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = { errors: { misc: "" } };

    if (req.body.amount % 5 !== 0 || req.body.amount > 100) {
      errors.errors.misc = "No more posts after this one.";
      return res.status(400).send(errors);
    }

    const getPosts = (
      skipAmount = 0,
      limitAmount = 5,
      postsToReturn = [],
      idsToSkip = []
    ) => {
      postSchema
        .find({})
        .skip(skipAmount)
        .limit(limitAmount)
        .populate("comments")
        .sort({ datePosted: "desc" })
        .exec()
        .then(posts => {
          if (postsToReturn.length < limitAmount && skipAmount < 200) {
            let filteredArray = posts.map(post => {
              return post.p_id.toString();
            });
            let filteredArrayToSet = new Set(filteredArray);
            let filteredArrayBackToArray = Array.from(filteredArrayToSet);
            for (let i = 0; i < filteredArrayBackToArray.length; i++) {
              if (
                idsToSkip.includes(filteredArrayBackToArray[i]) === false &&
                postsToReturn.length !== limitAmount
              ) {
                postsToReturn.push(
                  posts[filteredArray.indexOf(filteredArrayBackToArray[i])]
                );
                idsToSkip.push(filteredArrayBackToArray[i]);
              }
            }
            getPosts(
              skipAmount + limitAmount,
              limitAmount,
              postsToReturn,
              idsToSkip
            );
          } else {
            return res.send(postsToReturn);
          }
        })
        .catch(err => {
          if (err) {
            return res
              .status(500)
              .send(`There was an error finding the posts.`);
          }
        });
    };

    getPosts(0, req.body.amount, [], []);
  }
);

//Private Route
//Just testing finding a specific post with an array field and updating it
router.post(
  "/friends-posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let returnArray = [];
    profileSchema.findOne({ user: req.user.id }, (err, response) => {
      if (err) {
        return res.status(500).send("Error finding profile with posts.");
      } else {
        response.friends.forEach(friends => {
          returnArray.push(friends.toString());
        });
        returnArray.push(response._id.toString());
        postSchema
          .find({})
          .populate("comments")
          .limit(100)
          .sort({ datePosted: "desc" })
          .exec((err, response3) => {
            if (err) {
              return res.status(500).send("Error finding posts");
            } else {
              let newArray = response3.filter(posts => {
                return returnArray.includes(posts.p_id.toString());
              });
              return res.send(newArray.slice(0, req.body.amount));
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
    const errors = profileValidation.profileIdValidation(req.body.profileId);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    let returnArray = [];
    profileSchema.findById(req.body.profileId).exec((err, profile) => {
      if (err) {
        return res.status(500).send("Error finding the profile.");
      } else {
        profile.posts.forEach(posts => {
          returnArray.push(posts.toString());
        });
        postSchema
          .find({})
          .populate("comments")
          .limit(100)
          .sort({ datePosted: "desc" })
          .exec((err, response) => {
            if (err) {
              return res.status(500).send("Error finding posts.");
            } else {
              let newArray = response.filter(posts => {
                return returnArray.includes(posts._id.toString());
              });
              return res.send(newArray.slice(0, req.body.amount));
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
        errors.errors.misc = "Cannot find profile for this user.";
        return res.status(500).send(errors);
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
            errors.errors.misc = "Cannot save this post due to server error.";
            return res.status(500).send(errors);
          } else {
            profileSchema.findByIdAndUpdate(
              response._id,
              { $push: { posts: data } },
              (err, post) => {
                if (err) {
                  errors.errors.misc =
                    "Cannot update profile with this post due to server error.";
                  return res.status(500).send(errors);
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
        errors.errors.misc = "Cannot find specific profile to make post.";
        return res.status(500).send(errors);
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
            errors.errors.misc = "Cannot save the post due to server error.";
            return res.status(500).send(errors);
          } else {
            profileSchema.findByIdAndUpdate(
              req.body.profileId,
              { $push: { posts: data } },
              (err, post) => {
                if (err) {
                  errors.errors.misc =
                    "Cannot update the profile with the post.";
                  return res.status(500).send(errors);
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
        errors.errors.misc =
          "Cannot find profile for this comment on the server.";
        return res.status(500).send(errors);
      } else {
        userSchema.findById(req.user.id, (err, response2) => {
          if (err) {
            errors.errors.misc =
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
                  errors.errors.misc =
                    "Cannot update the profile of the user who made this comment.";
                  return res.status(500).send(errors);
                } else {
                  newComment.save((err, data) => {
                    if (err) {
                      errors.errors.misc =
                        "Cannot save the comment in the database.";
                      return res.status(500).send(errors);
                    } else {
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
//Used to delete a user's post
router.put(
  "/delete-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.body.postId);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    postSchema.findById(req.body.postId, (err, response) => {
      if (err) {
        return res.status(500).send("Error finding post.");
      }
      let arrayOfCommentIds = response.comments;
      arrayOfCommentIds.forEach(comment => {
        commentSchema.findByIdAndDelete(comment, (err, response2) => {
          if (err) {
            return res
              .status(500)
              .send("Error finding comment under post to delete.");
          } else {
            return;
          }
        });
      });
      postSchema.findByIdAndDelete(req.body.postId, (err, response3) => {
        if (err) {
          return res.status(500).send("Error finding post to delete.");
        }
        return;
      });
      profileSchema.findByIdAndUpdate(
        response.p_id,
        { $pull: { posts: response._id } },
        (err, response4) => {
          if (err) {
            return res
              .status(500)
              .send("Error finding profile to update posts.");
          } else {
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
    const errors = profileValidation.profileIdValidation(req.body.commentId);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    commentSchema.findByIdAndDelete(req.body.commentId, (err, response) => {
      if (err) {
        return res.status(500).send("Error finding comment to delete");
      }
      postSchema.findByIdAndUpdate(
        req.body.postId,
        { $pull: { comments: response._id } },
        (err, response) => {
          if (err) {
            return res
              .status(500)
              .send("Error finding post to remove comment from.");
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
