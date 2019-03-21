const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../../schemas/users.js");

const saltRounds = process.env.SALT_ROUNDS;

router.get("/test", (req, res) => {
  res.send("Router for Users works!");
});

//Public Route
//Create a new user - Hash password and store necessary information in DB
router.post("/sign-up", (req, res) => {
  if (req.body.password === req.body.password2) {
    bcrypt
      .hash(req.body.password, saltRounds)
      .then(hash => {
        const newUser = new userSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          password2: hash
        });
        newUser.save(err => {
          if (err) {
            res.send("User not saved to mongo" + err);
          } else {
            res.send(newUser);
          }
        });
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.send("Passwords must match!");
  }
});

//Public route
//Login - Login using an email and password, compares password in database and creates a token to be stored in user's localstorage if login is successful
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
          return res.send(response);
        }
      });
    })
    .catch(err => {
      res.send(`There was an error - ${err}`);
    });
});
module.exports = router;
