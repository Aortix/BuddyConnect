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

      const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: salt,
        password2: salt
      });

      const newProfile = new profileSchema({
        name: req.body.name,
        user: newUser
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
router.put(
  "/update-name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findOneAndUpdate(
      { user: req.user.id },
      { name: req.body.name },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        userSchema.findByIdAndUpdate(
          req.user.id,
          { name: req.body.name },
          (err, response2) => {
            if (err) {
              return res.send(err);
            } else {
            }
          }
        );
        postSchema.updateMany(
          { p_id: response._id },
          { name: req.body.name },
          (err, response3) => {
            if (err) {
              return res.send(err);
            } else {
            }
          }
        );
        commentsSchema.updateMany(
          { commenterP_id: response._id },
          { commenterName: req.body.name },
          (err, response4) => {
            if (err) {
              return res.send(err);
            } else {
            }
          }
        );
        return res.send("Name should have been updated everywhere.");
      }
    );
  }
);

//Private Route
//Updating the current user's email
router.put(
  "/update-email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      }
      bcrypt.compare(req.body.password, response.password, (err, response2) => {
        if (err) {
          return res.send(err);
        } else if (response2 == false) {
          return res.send("Current password is incorrect.");
        } else {
          userSchema.findByIdAndUpdate(
            req.user.id,
            { email: req.body.email },
            (err,
            response3 => {
              if (err) {
                return res.send(err);
              } else {
                return res.send("Email changed!");
              }
            })
          );
        }
      });
    });
  }
);

//Private Route
//Updating the current user's password
router.put(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      }
      bcrypt.compare(
        req.body.password2,
        response.password,
        (err, response2) => {
          if (err) {
            return res.send(err);
          } else if (response2 == false) {
            return res.send("Current password is incorrect.");
          } else {
            bcrypt.hash(req.body.password, saltRounds, (err, salt) => {
              if (err) {
                return res.send(err);
              }
              userSchema.findByIdAndUpdate(
                req.user.id,
                { password: salt, password2: salt },
                (err,
                response3 => {
                  if (err) {
                    return res.send(err);
                  } else {
                    return res.send("Password changed!");
                  }
                })
              );
            });
          }
        }
      );
    });
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
router.put(
  "/delete-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      } else {
        bcrypt.compare(
          req.body.password2,
          response.password,
          (err, response2) => {
            if (err) {
              return res.send(err);
            } else if (response2 == false) {
              return res.send("Current password is incorrect.");
            } else {
              profileSchema.findOneAndRemove(
                { user: req.user.id },
                (err, response2) => {
                  if (err) {
                    return res.send(err);
                  } else {
                    console.log("Profile deleted.");
                    commentsSchema.deleteMany(
                      { commenterP_id: response2._id },
                      (err, response) => {
                        if (err) {
                          return res.send(err);
                        } else {
                          console.log("Comments deleted.");
                        }
                      }
                    );
                    postSchema.deleteMany(
                      { p_id: response2._id },
                      (err, response) => {
                        if (err) {
                          return res.send(err);
                        } else {
                          console.log("Posts deleted.");
                        }
                      }
                    );
                    userSchema.findByIdAndDelete(
                      req.user.id,
                      (err, response) => {
                        if (err) {
                          return res.send(err);
                        } else {
                          console.log("User deleted.");
                        }
                      }
                    );
                    return res.send("Everything should be deleted.");
                  }
                }
              );
            }
          }
        );
      }
    });
  }
);
module.exports = router;
