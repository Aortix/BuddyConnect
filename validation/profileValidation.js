const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");

var alphanumberic = /^[a-z\d\-_\s]+$/i;

const aboutMeValidation = data => {
  const errors = {};

  if (!validator.isLength(data.aboutMe, { min: 0, max: 350 })) {
    errors.aboutMe = "Update Failed: About me cannot exceed 350 characters.";
  }

  if (validator.isEmpty(data.aboutMe)) {
    errors.aboutMe = "Update Failed: About me cannot be empty.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

const interestsValidation = data => {
  const errors = {};

  if (!validator.isLength(data.interests, { min: 0, max: 350 })) {
    errors.interests = "Update Failed: Interests cannot exceed 350 characters.";
  }

  if (validator.isEmpty(data.interests)) {
    errors.interests = "Update Failed: Interests cannot be empty.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

module.exports = { aboutMeValidation, interestsValidation };
