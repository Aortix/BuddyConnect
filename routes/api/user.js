const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const userSchema = require("../../schemas/users.js");
const postSchema = require("../../schemas/posts.js");
const profileSchema = require("../../schemas/profiles.js");
const commentsSchema = require("../../schemas/comments.js");

require("./../../auth/jwtStrategy")(passport);

const saltRounds = 12;

//Public Route
//Create a new user - Hash password and store necessary information in DB
router.post("/sign-up", (req, res) => {
  if (req.body.password === req.body.password2) {
    bcrypt.hash(req.body.password, saltRounds, (err, salt) => {
      if (err) {
        return res.send(err);
      }

      //Creating initial user schema requires these other initial schema declarations in order to have everything connected by ref
      //const newComment = new commentsSchema({});
      /*const newPost = new postSchema({
        comments: [newComment]
      });*/
      const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: salt,
        password2: salt
      });

      const newProfile = new profileSchema({
        user: newUser /*posts: [newPost]*/
      });

      //Adjust later and use promises or async/await instead.
      newUser.save(err => {
        if (err) {
          return res.send(err);
        } else {
          newProfile.save((err, data) => {
            if (err) {
              return res.send(err);
            } else {
              return res.send(
                "New User and Profile have been created.\n" + data
              );
            }
          });
        }
      });
    });
  } else {
    return res.send("Passwords must match!");
  }
});

//Public route
/*Login - Login using an email and password, compares password to one in database and creates a token to be stored 
in user's localstorage if login is successful*/
router.post("/login", (req, res) => {
  userSchema
    .findOne({ email: req.body.email }, (err, response) => {
      if (err) {
        return res.send(`Error with finding email - ${err}`);
      }

      if (response === null || response === undefined) {
        return res.send("Email is not found.");
      }

      return response;
    })
    .then(response => {
      bcrypt.compare(req.body.password, response.password, (err, data) => {
        if (err) {
          return res.send(`Error with getting password - ${err}`);
        }

        if (data !== true) {
          return res.send("Password is incorrect.");
        } else {
          let query = {
            id: response._id,
            name: response.name
          };
          jwt.sign(
            query,
            process.env.SECRET_KEY,
            {
              expiresIn: "4h"
            },
            (err, token) => {
              if (err) {
                return res.send(`Could not generate token or send it - ${err}`);
              }
              return res.send({ token: "Bearer " + token });
            }
          );
        }
      });
    })
    .catch(err => {
      return res.send(`There was an error - ${err}`);
    });
});

//Private Route
//Updating the current user's name
/*router.put(
  "/update-name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Users name has been changed.\n" + response);
      }
    );
  }
);*/

//Private Route
//Updating the current user's email
router.put(
  "/update-email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findByIdAndUpdate(
      req.user.id,
      { email: req.body.email },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Users email has been changed.\n" + response);
      }
    );
  }
);

//Private Route
//Updating the current user's password
router.put(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.newPassword === req.body.newPassword2) {
      userSchema
        .findById(req.user.id, (err, user) => {
          if (err) {
            return res.send(err);
          } else if (user === null || user === undefined || user === 0) {
            return res.send("User not found.");
          } else {
            return user;
          }
        })
        .then(user => {
          bcrypt.compare(
            req.body.currentPassword,
            user.password,
            (err, response) => {
              if (err) {
                return res.send(err);
              }
              if (response !== true) {
                return res.send("Password is incorrect!");
              } else {
                bcrypt.hash(req.body.newPassword, saltRounds, (err, salt) => {
                  if (err) {
                    return res.send(err);
                  } else {
                    userSchema.findByIdAndUpdate(
                      req.user.id,
                      { password: salt, password2: salt },
                      (err, response) => {
                        if (err) {
                          return res.send(err);
                        } else {
                          return res.send("Password Changed!");
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        })
        .catch(err => {
          return res.send(`Caught an error -> ${err}`);
        });
    } else {
      return res.send("New password does not match in both entries!");
    }
  }
);

//Private Route
//Gets the current user that is logged in
router.get(
  "/current-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema
      .findById(req.user.id)
      /*.populate("profile")
      .populate({ path: "profile", populate: { path: "userPosts" } })
      .populate({
        path: "profile",
        populate: { path: "userPosts", populate: { path: "comments" } }
      })*/
      .exec((err, response) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(response);
        }
      });
  }
);

router.post(
  "/verify-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    jwt.verify(
      req.body.token.substring(7, req.body.token.length),
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send(decoded);
        }
      }
    );
  }
);

//Private Route
//Removes user account and profile; still deciding on whether or not to remove posts and comments from the past...
//Will come back to this...
router.delete(
  "/delete-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /*
    userSchema.findById(req.user.id, (err, user) => {
      if (err) {
        return res.send(err);
      } else {
        let userPostsIds = Array.from(...user.userPosts);
        let userCommentsIds = [];
        userPostsIds.forEach((postIds, index) => {
          postSchema.findById(postIds, (err, posts) => {
            if (err) {
              return res.send(err);
            } else {
              userCommentsIds += posts.comments[index];
              return console.log(postIds, posts, userCommentsIds);
            }
          });
        });
        userCommentsIds.forEach(comments => {
          commentsSchema.findById(comments, (err, comment) => {
            if (err) {
              return res.send(err);
            } else {
              return console.log(comment);
            }
          });
        });
      }
    });

    /*let profileId = userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      }
      return response.profile;
    });

    profileSchema.findByIdAndDelete(profileId, (err, response) => {
      if (err) {
        return res.send(err);
      }

      //should redirect to login page
      return res.send(response);
    });

    userSchema.findByIdAndDelete(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      }

      return res.send(response);
    }); */
  }
);
module.exports = router;
