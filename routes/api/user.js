const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../../schemas/users.js");

router.get("/test", (req, res) => {
  res.send("Router for Users works!");
});

//Public Route
//Create a new user - Hash password and store necessary information in DB
router.post("/create-user", (req, res) => {
  if (req.body.password === req.body.password2) {
    const saltRounds = 12;

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

module.exports = router;
