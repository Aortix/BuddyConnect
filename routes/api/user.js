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
      const newProfile = new profileSchema({});
      const newComment = new commentsSchema({});
      const newPost = new postSchema({
        comments: [newComment]
      });
      const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: salt,
        password2: salt,
        profile: newProfile,
        userPosts: newPost
      });

      //Adjust later and use promises or async/await instead.
      newProfile.save(err => {
        if (err) {
          res.send(err);
        } else {
          newComment.save(err => {
            if (err) {
              res.send(err);
            } else {
              newPost.save(err => {
                if (err) {
                  res.send(err);
                } else {
                  newUser.save((err, data) => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.send(data);
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  } else {
    res.send("Passwords must match!");
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
          jwt.sign(
            { id: response._id, name: response.name, avatar: response.avatar },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h"
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
      res.send(`There was an error - ${err}`);
    });
});

//Private Route
//Gets the current user that is logged in
router.get(
  "/current-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);
module.exports = router;
