const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const router = express.Router();

const userSchema = require("../../schemas/users.js");
const postSchema = require("../../schemas/posts.js");
const profileSchema = require("../../schemas/profiles.js");
const commentsSchema = require("../../schemas/comments.js");

const signUpValidation = require("./../../validation/signUpValidation");
const loginValidation = require("./../../validation/loginValidation");
const settingsPageValidation = require("./../../validation/settingsPageValidation");
const isEmpty = require("./../../client/src/utilities/isEmpty");

require("./../../auth/jwtStrategy")(passport);

const saltRounds = 12;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET_NAME
});

//Public Route
//Create a new user - Hash password and store necessary information in DB
router.post("/sign-up", (req, res, next) => {
  const errors = signUpValidation(req.body);

  if (errors.noErrors === false) {
    return res.status(400).send(errors);
  }

  const params = new URLSearchParams();
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
  params.append("response", req.body.captcha);

  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.success === true) {
        userSchema.find({ email: req.body.email }).exec((err, response) => {
          if (err) {
            errors.errors.email =
              "Problem checking users for this email. Try again.";
            return res.status(400).send(errors);
          }
          if (isEmpty(response) === false) {
            errors.errors.email =
              "This email is already attached to an account.";
            return res.status(400).send(errors);
          } else {
            if (req.body.password === req.body.password2) {
              bcrypt.hash(req.body.password, saltRounds, (err, salt) => {
                if (err) {
                  errors.errors.password =
                    "Problem with hashing the password on our server.";
                  return res.status(500).send(errors);
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

                newUser.save(err => {
                  if (err) {
                    errors.errors.misc =
                      "Problem with saving the user to the database. Try again.";
                    return res.status(500).send(errors);
                  } else {
                    newProfile.save((err, data) => {
                      if (err) {
                        errors.errors.misc =
                          "Problem with saving the user's profile to the database. Try again.";
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
            }
          }
        });
      } else {
        errors.errors.misc = "Captcha Incorrect.";
        return res.status(400).send(errors);
      }
    })
    .catch(err => {
      errors.errors.misc = "Issue with validating captcha.";
      return res.status(500).send(errors);
    });
});

//Public route
/*Login - Login using an email and password, compares password to one in database and creates a token to be stored 
in user's localstorage if login is successful*/
router.post("/login", (req, res) => {
  const errors = loginValidation(req.body);

  if (errors.noErrors === false) {
    return res.status(400).send(errors);
  }

  if (req.body.attempts > 3) {
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", req.body.captcha);

    fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: params
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.success === true) {
          userSchema
            .findOne({ email: req.body.email }, (err, response) => {
              if (response == null || response == undefined) {
                errors.errors.email = "Email doesn't exist in our database.";
                return res.status(400).send(errors);
              } else if (err) {
                errors.errors.email =
                  "Problem with searching the database for this email. Try again.";
                return res.status(400).send(errors);
              } else {
                return response;
              }
            })
            .then(response => {
              bcrypt.compare(
                req.body.password,
                response.password,
                (err, data) => {
                  if (data !== true) {
                    errors.errors.password = "Password is incorrect.";
                    return res.status(400).send(errors);
                  } else if (err) {
                    errors.errors.password =
                      "Problem with searching for the password in our database. Try again.";
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
                            "Error generating the token on our server. Try again.";
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
                }
              );
            })
            .catch(err => {
              errors.errors.misc = "Error signing in as this user";
              return res.status(500).send(errors);
            });
        } else {
          errors.errors.misc = "Captcha Incorrect.";
          return res.status(400).send(errors);
        }
      });
  } else {
    userSchema
      .findOne({ email: req.body.email }, (err, response) => {
        if (response == null || response == undefined) {
          errors.errors.email = "Email doesn't exist in our database.";
          return res.status(400).send(errors);
        } else if (err) {
          errors.errors.email =
            "Problem with searching the database for this email. Try again.";
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
              "Problem with searching for the password in our database. Try again.";
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
                    "Error generating the token on our server. Try again.";
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
        errors.errors.misc = "Error signing in as this user";
        return res.status(500).send(errors);
      });
  }
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
          errors.errors.name =
            "There was an error updating the name on your profile. Try again.";
          return res.status(500).send(errors);
        }
        userSchema.findByIdAndUpdate(
          req.user.id,
          { name: req.body.name },
          (err, response2) => {
            if (err) {
              errors.errors.name =
                "There was an error updating the name on your user. Try again.";
              return res.status(500).send(errors);
            } else {
            }
          }
        );
        postSchema.updateMany(
          { p_id: response._id },
          { name: req.body.name },
          (err, response3) => {
            if (err) {
              errors.errors.name =
                "There was an error updating the name on your posts. Try again.";
              return res.status(500).send(errors);
            } else {
            }
          }
        );
        commentsSchema.updateMany(
          { commenterP_id: response._id },
          { commenterName: req.body.name },
          (err, response4) => {
            if (err) {
              errors.errors.name =
                "There was an error updating the name on your comments. Try again.";
              return res.status(500).send(errors);
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

    userSchema.find({ email: req.body.email }).exec((err, iniResponse) => {
      if (err) {
        errors.errors.email =
          "Problem checking users for this email. Try again.";
        return res.status(400).send(errors);
      }
      if (isEmpty(iniResponse) === false) {
        errors.errors.email = "This email is already attached to an account.";
        return res.status(400).send(errors);
      } else {
        userSchema.findById(req.user.id, (err, response) => {
          if (err) {
            errors.errors.misc = "Could not find user to update. Try again.";
            return res.status(500).send(errors);
          }
          bcrypt.compare(
            req.body.emailPassword,
            response.password,
            (err, response2) => {
              if (err) {
                return res.send(err);
              } else if (response2 == false) {
                errors.errors.emailPassword = "Incorrect Password.";
                return res.status(400).send(errors);
              } else {
                userSchema.findByIdAndUpdate(
                  req.user.id,
                  { email: req.body.email },
                  (err,
                  response3 => {
                    if (err) {
                      errors.errors.misc =
                        "Could not update email for the user. Try again.";
                      return res.status(500).send(errors);
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
            errors.misc = "Something went wrong with checking pass in DB.";
            return res.status(400).send(errors);
          } else if (response2 == false) {
            errors.errors.passwordPassword2 = "Current password is incorrect.";
            return res.status(400).send(errors);
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
                    errors.errors.misc =
                      "Cannot update password for user. Try again.";
                    return res.status(400).send(errors);
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
        errors.avatar = ".jpeg, .jpg, and .png images only!";
        req.avatarValidation = "Images only!";
        return cb(null, false);
      }
    };

    let upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: "buddyconnectbucket",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
          cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
          );
        }
      }),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        checkAvatarUpload(req, file, cb);
      }
    }).single("avatar");

    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        errors.misc = "Image is too big. 1MB max size.";
        return res.status(400).send(errors);
      } else if (err) {
        errors.misc =
          "Something went wrong with the image uploading. Try again.";
        return res.status(500).send(errors);
      } else if (req.avatarValidation) {
        return res.status(400).send(errors);
      } else {
        userSchema.findById(req.user.id, (err, response) => {
          if (err) {
            errors.misc = "Can't find user account to update. Try again.";
            return res.status(500).send(errors);
          } else {
            if (response.avatar === "newstandard3.png") {
            } else {
              s3.deleteObject(
                {
                  Bucket: process.env.BUCKET_NAME,
                  Key: response.avatar
                },
                (err, data) => {
                  if (err) {
                    errors.misc = "Error deleting previous avatar.";
                    return res.status(500).send(errors);
                  } else {
                  }
                }
              );
            }
          }
        });

        userSchema.findByIdAndUpdate(
          req.user.id,
          { avatar: req.file.key },
          (err, response) => {
            if (err) {
              errors.misc = "Can't find user account to update. Try again.";
              return res.status(500).send(errors);
            } else {
            }
          }
        );
        profileSchema.findOneAndUpdate(
          { user: req.user.id },
          { avatar: req.file.key },
          (err, response) => {
            if (err) {
              errors.misc = "Can't find profile to update. Try again.";
              return res.status(500).send(errors);
            } else {
              postSchema.updateMany(
                { p_id: response._id },
                { avatar: req.file.key },
                (err, response2) => {
                  if (err) {
                    errors.misc = "Can't update avatar on posts. Try again.";
                    return res.status(500).send(errors);
                  } else {
                  }
                }
              );
              commentsSchema.updateMany(
                { commenterP_id: response._id },
                { commenterAvatar: req.file.key },
                (err, response3) => {
                  if (err) {
                    errors.misc = "Can't update avatar on comments. Try again.";
                    return res.status(500).send(errors);
                  } else {
                  }
                }
              );
            }
          }
        );
      }
      return res.send(req.file.key);
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
          return res.status(500).send();
        } else if (decoded === undefined) {
          return res.status(401).send("Invalid token.");
        } else {
          return res.send("Valid.");
        }
      }
    );
  }
);

//Private Route
//Removes user account and profile; still deciding on whether or not to remove posts and comments from the past...
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
        errors.errors.misc = "Cannot find user. Try again.";
        return res.status(500).send(errors);
      } else {
        bcrypt.compare(
          req.body.deleteAccountPassword,
          response.password,
          (err, response2) => {
            if (err) {
              errors.errors.misc =
                "Something went wrong with comparing password from db. Try again.";
              return res.status(500).send(errors);
            } else if (response2 == false) {
              errors.errors.misc = "Password is incorrect.";
              return res.status(500).send(errors);
            } else {
              profileSchema.findOneAndRemove(
                { user: req.user.id },
                (err, response3) => {
                  if (err) {
                    errors.errors.misc =
                      "Cannot find profile to delete. Try again.";
                    return res.status(500).send(errors);
                  } else {
                    commentsSchema.deleteMany(
                      { commenterP_id: response3._id },
                      (err, response) => {
                        if (err) {
                          errors.errors.misc =
                            "Cannot find comments to delete. Try again.";
                          return res.status(500).send(errors);
                        } else {
                        }
                      }
                    );
                    postSchema.deleteMany(
                      { p_id: response3._id },
                      (err, response) => {
                        if (err) {
                          errors.errors.misc =
                            "Cannot find posts to delete. Try again.";
                          return res.status(500).send(errors);
                        } else {
                        }
                      }
                    );
                    userSchema.findByIdAndDelete(
                      req.user.id,
                      (err, response) => {
                        if (err) {
                          errors.errors.misc =
                            "Cannot find user to delete. Try again.";
                          return res.status(500).send(errors);
                        } else {
                          if (response.avatar === "newstandard3.png") {
                            return res.send("Everything should be deleted.");
                          } else {
                            s3.deleteObject(
                              {
                                Bucket: process.env.BUCKET_NAME,
                                Key: response.avatar
                              },
                              (err, data) => {
                                if (err) {
                                  errors.misc =
                                    "Error deleting previous avatar.";
                                  return res.status(500).send(errors);
                                } else {
                                  return res.send(
                                    "Everything should be deleted."
                                  );
                                }
                              }
                            );
                          }
                        }
                      }
                    );
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
