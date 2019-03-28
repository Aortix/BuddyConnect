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
        return res.send(err);
      }
      return res.send(data);
    });
  }
);

//Private Route
//Used to update the user's header
router.put(
  "/update-header",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = { _id: req.user.p_id };
    profileSchema.findOneAndUpdate(
      query,
      { header: req.body.header },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Header Updated!");
      }
    );
  }
);

//Private Route
//Used to update the user's avatar
router.put(
  "/update-avatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = { _id: req.user.p_id };
    profileSchema.findOneAndUpdate(
      query,
      { avatar: req.body.avatar },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Avatar Updated!");
      }
    );
  }
);

//Private Route
//Used to update the user's song
router.put(
  "/update-song",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = { _id: req.user.p_id };
    profileSchema.findOneAndUpdate(
      query,
      { song: req.body.song },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Song Updated!");
      }
    );
  }
);

//Private Route
//Used to update the user's about me section
router.put(
  "/update-aboutMe",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = { _id: req.user.p_id };
    profileSchema.findOneAndUpdate(
      query,
      { aboutMe: req.body.aboutMe },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("About me Updated!");
      }
    );
  }
);

//Private Route
//Used to update the user's interests section
router.put(
  "/update-interests",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let query = { _id: req.user.p_id };
    profileSchema.findOneAndUpdate(
      query,
      { interests: req.body.interests },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Interests Updated!");
      }
    );
  }
);

module.exports = router;
