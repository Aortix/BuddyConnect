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
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findById(req.params.profileId, (err, data) => {
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
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
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
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
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
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
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
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
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
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
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

//Private Route
//Used to reset the user's header back to default
router.put(
  "/reset-header",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
      { header: null },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Header Reset!");
      }
    );
  }
);

//Private Route
//Used to reset the user's avatar back to default
router.put(
  "/reset-avatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
      { avatar: null },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Avatar Reset!");
      }
    );
  }
);

//Private Route
//Used to reset the user's song back to default
router.put(
  "/reset-song",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
      { song: null },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Song Reset!");
      }
    );
  }
);

//Private Route
//Used to reset the user's about me section back to default
router.put(
  "/reset-aboutMe",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
      { aboutMe: null },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("About me Reset!");
      }
    );
  }
);

//Private Route
//Used to reset the user's interests back to default
router.put(
  "/reset-interests",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profileSchema.findByIdAndUpdate(
      req.user.p_id,
      { interests: null },
      (err, response) => {
        if (err) {
          return res.send(err);
        }
        return res.send("Interests Reset!");
      }
    );
  }
);
module.exports = router;
