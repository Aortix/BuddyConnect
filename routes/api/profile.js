const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const profileSchema = require("../../schemas/profiles.js");
const router = express.Router();

const profileValidation = require("./../../validation/profileValidation");
const commonRegex = require("./../../validation/regex");

const { textAreaRequirements } = commonRegex;

require("./../../auth/jwtStrategy")(passport);

//Private Route
//Used to get a user's profile information
router.get(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.params.profileId);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    profileSchema.findById(req.params.profileId, (err, data) => {
      if (err) {
        return res.status(500).send("Cannot find profile.");
      }
      return res.send(data);
    });
  }
);

router.get(
  "/my/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.user.id);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    profileSchema.findOne({ user: req.user.id }, (err, data) => {
      if (err) {
        return res.status(500).send("Cannot find profile.");
      } else {
        return res.send(data);
      }
    });
  }
);

//Private Route
//Adds a friend to your friends list
router.put(
  "/friends/add-friend",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.user.id);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    const errors2 = profileValidation.profileIdValidation(req.body.profileId);

    if (errors2.noErrors === false) {
      return res.status(400).send();
    }

    profileSchema.findOneAndUpdate(
      { user: req.user.id },
      { $push: { friends: req.body.profileId } },
      (err, response) => {
        if (err) {
          return res
            .status(500)
            .send("Cannot find profile to update with new friend.");
        } else {
          return res.send(response);
        }
      }
    );
  }
);

//Private Route
//Deleting a friend using their profileId as a param
router.put(
  "/friends/delete-friend",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.user.id);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    const errors2 = profileValidation.profileIdValidation(req.body.friendId);

    if (errors2.noErrors === false) {
      return res.status(400).send();
    }

    profileSchema.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { friends: req.body.friendId } },
      (err, response) => {
        if (err) {
          return res
            .status(500)
            .send("Cannot find profile to update friends list.");
        } else {
          return res.send("Friend was deleted!");
        }
      }
    );
  }
);

router.post(
  "/friends/check-for-friend",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.user.id);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    profileSchema.findOne({ user: req.user.id }, (err, response) => {
      let returnArray = [];
      if (err) {
        return res
          .status(500)
          .send("Could not find profile to check if a friend.");
      } else {
        response.friends.forEach(friends => {
          returnArray.push(friends.toString());
        });
        if (returnArray.includes(req.body.profileId) === true) {
          return res.send(true);
        } else {
          return res.send(false);
        }
      }
    });
  }
);

router.post(
  "/friends/friend-thumbnails",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.body.profileId);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    let returnArray = [];
    profileSchema
      .findById(req.body.profileId)
      .populate({ path: "friends", model: profileSchema })
      .exec((err, response) => {
        if (err) {
          return res
            .status(500)
            .send("Could not find profile to check for friends.");
        } else {
          response.friends.forEach(friend => {
            returnArray.push({
              name: friend.name,
              avatar: friend.avatar,
              profileId: friend._id
            });
          });
          return res.send(returnArray);
        }
      });
  }
);

//Private Route
//Used to update the user's header
router.put(
  "/update/update-header",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.profileIdValidation(req.user.id);

    if (errors.noErrors === false) {
      return res.status(400).send();
    }

    if (textAreaRequirements.test(req.body.header) !== true) {
      return res.status(400).send();
    }

    profileSchema.findOneAndUpdate(
      { user: req.user.id },
      { header: req.body.header },
      (err, response) => {
        if (err) {
          return res.status(500).send("Could not find profile to update.");
        }
        return res.send("Header Updated!");
      }
    );
  }
);

//Private Route
//Used to update the user's about me section
router.put(
  "/update/update-aboutMe",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.aboutMeValidation(req.body);
    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    profileSchema.findOneAndUpdate(
      { user: req.user.id },
      { aboutMe: req.body.aboutMe },
      (err, response) => {
        if (err) {
          errors.errors.aboutMe = "Profile cannot be found.";
          return res.status(400).send(errors);
        }
        return res.send("About me Updated!");
      }
    );
  }
);

//Private Route
//Used to update the user's interests section
router.put(
  "/update/update-interests",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = profileValidation.interestsValidation(req.body);
    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    profileSchema.findOneAndUpdate(
      { user: req.user.id },
      { interests: req.body.interests },
      (err, response) => {
        if (err) {
          if (err) {
            errors.errors.interests = "Profile cannot be found.";
            return res.status(400).send(errors);
          }
        }
        return res.send("Interests Updated!");
      }
    );
  }
);
module.exports = router;
