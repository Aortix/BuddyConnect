const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const defaultHeaders = require("./../../public/uploads/defaults/defaultHeaders");
const userSchema = require("../../schemas/users.js");
const postSchema = require("../../schemas/posts.js");
const profileSchema = require("../../schemas/profiles.js");
const commentsSchema = require("../../schemas/comments.js");

const signUpValidation = require("./../../validation/signUpValidation");
const loginValidation = require("./../../validation/loginValidation");
const settingsPageValidation = require("./../../validation/settingsPageValidation");

require("./../../auth/jwtStrategy")(passport);

const saltRounds = 12;

//Public Route
//Create a new user - Hash password and store necessary information in DB
router.post("/sign-up", (req, res, next) => {
  const errors = signUpValidation(req.body);

  if (errors.noErrors === false) {
    //errors.statusCode = 400;
    return res.status(400).send(errors);
  }

  if (req.body.password === req.body.password2) {
    bcrypt.hash(req.body.password, saltRounds, (err, salt) => {
      if (err) {
        errors.errors.password =
          "Problem with hashing the password on our server.";
        return res.status(500).send(errors);
      }

      const newHeader = defaultHeaders[Math.floor(Math.random() * 4)];

      const newUser = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: salt,
        password2: salt
      });

      const newProfile = new profileSchema({
        name: req.body.name,
        header: newHeader,
        user: newUser
      });

      //Adjust later and use promises or async/await instead.
      newUser.save(err => {
        if (err) {
          errors.errors.misc = "Problem with saving the user to the database.";
          return res.status(500).send(errors);
        } else {
          newProfile.save((err, data) => {
            if (err) {
              errors.errors.misc =
                "Problem with saving the user's profile to the database.";
              return res.status(500).send(errors);
            } else {
              return res
                .status(200)
                .send("New User and Profile have been created.");
            }
          });
        }
      });
    });
  } else {
    return res.status(400).send("Passwords must match!");
  }
});

//Public route
/*Login - Login using an email and password, compares password to one in database and creates a token to be stored 
in user's localstorage if login is successful*/
router.post("/login", (req, res) => {
  const errors = loginValidation(req.body);

  if (errors.noErrors === false) {
    return res.status(400).send(errors);
  }

  userSchema
    .findOne({ email: req.body.email }, (err, response) => {
      if (response == null || response == undefined) {
        errors.errors.email = "Email doesn't exist in our database.";
        console.log(errors);
        return res.status(400).send(errors);
      } else if (err) {
        errors.errors.email =
          "Problem with searching the database for this email";
        return res.status(400).send(errors);
      } else {
        return response;
      }
    })
    .then(response => {
      bcrypt.compare(req.body.password, response.password, (err, data) => {
        if (data !== true) {
          errors.errors.password = "Password is incorrect.";
          return res.status(400).send(errors);
        } else if (err) {
          errors.errors.password =
            "Problem with searching for the password in our database.";
          return res.status(500).send(errors);
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
                errors.errors.misc =
                  "Error generating the token on our server.";
                return res.status(500).send(errors);
              } else {
                return res.send({
                  token: "Bearer " + token,
                  avatar: response.avatar,
                  name: response.name
                });
              }
            }
          );
        }
      });
    })
    .catch(err => {
      return res.status(500).send(`There was an error.`);
    });
});

//Private Route
//Updating the current user's name
router.put(
  "/update-name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = settingsPageValidation.updateNameValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }

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
        return res.send(req.body.name);
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
    const errors = settingsPageValidation.updateEmailValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      }
      bcrypt.compare(
        req.body.emailPassword,
        response.password,
        (err, response2) => {
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
        }
      );
    });
  }
);

//Private Route
//Updating the current user's password
router.put(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = settingsPageValidation.updatePasswordValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }
    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      }
      bcrypt.compare(
        req.body.passwordPassword2,
        response.password,
        (err, response2) => {
          if (err) {
            return res.send(err);
          } else if (response2 == false) {
            return res.send("Current password is incorrect.");
          } else {
            bcrypt.hash(req.body.passwordPassword, saltRounds, (err, salt) => {
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

router.post(
  "/update-avatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const pathToFile = "./public/uploads/avatars/";

    //Function for filtering uploaded avatars so that only an image is uploaded
    checkAvatarUpload = (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype === true && extname === true) {
        return cb(null, true);
      } else {
        errors.avatar = "Images only!";
        req.avatarValidation = "Images only!";
        return cb(null, false);
      }
    };

    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public/uploads/avatars");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      }
    });

    let upload = multer({
      storage: storage,
      limits: { fileSize: 900000 },
      fileFilter: (req, file, cb) => {
        checkAvatarUpload(req, file, cb);
      }
    }).single("avatar");

    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send(errors);
      } else if (err) {
        return res.status(400).send(errors);
      } else if (req.avatarValidation) {
        return res.status(400).send(errors);
      } else {
        userSchema.findById(req.user.id, (err, response) => {
          if (err) {
            return res.send(err);
          } else {
            if (response.avatar === "standard.jpg") {
              console.log("Cant delete the standard avatar!");
            } else {
              fs.unlink(pathToFile + response.avatar, err => {
                if (err) throw err;
                console.log("Deletion successful.");
              });
            }
          }
        });
        userSchema.findByIdAndUpdate(
          req.user.id,
          { avatar: req.file.filename },
          (err, response) => {
            if (err) {
              return res.send(err);
            } else {
              return console.log("Avatar updated in user database.");
            }
          }
        );
        profileSchema.findOneAndUpdate(
          { user: req.user.id },
          { avatar: req.file.filename },
          (err, response) => {
            if (err) {
              return res.send(err);
            } else {
              console.log("Avatar updated in profile database.");

              postSchema.updateMany(
                { p_id: response._id },
                { avatar: req.file.filename },
                (err, response2) => {
                  if (err) {
                    return res.send(err);
                  } else {
                    console.log("Avatar updated in the post database.");
                  }
                }
              );
              commentsSchema.updateMany(
                { commenterP_id: response._id },
                { commenterAvatar: req.file.filename },
                (err, response3) => {
                  if (err) {
                    return res.send(err);
                  } else {
                    console.log("Avatar updated in the comments database.");
                  }
                }
              );
            }
          }
        );
      }
      return res.send(req.file.filename);
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
    const errors = settingsPageValidation.deleteAccountValidation(req.body);

    if (errors.noErrors === false) {
      return res.status(400).send(errors);
    }

    userSchema.findById(req.user.id, (err, response) => {
      if (err) {
        return res.send(err);
      } else {
        bcrypt.compare(
          req.body.deleteAccountPassword,
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
