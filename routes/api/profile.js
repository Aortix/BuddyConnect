const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const userSchema = require("../../schemas/users.js");
const postSchema = require("../../schemas/posts.js");
const profileSchema = require("../../schemas/profiles.js");

require("./../../auth/jwtStrategy")(passport);

//Private Route
//Used to get a user's profile information
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findOne({ name: req.params.name }, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send(data);
    });
  }
);

module.exports = router;
