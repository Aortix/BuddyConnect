const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");
const commonRegex = require("./regex");

const { textAreaRequirements } = commonRegex;

const profileIdValidation = data => {
  const errors = {};

  if (/^[a-z\d]+$/im.test(data) !== true) {
    errors.error = "Should not contain some of these characters.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

const aboutMeValidation = data => {
  const errors = {};

  if (textAreaRequirements.test(data.aboutMe) !== true) {
    errors.aboutMe = "These characters: <>{} are not allowed.";
  }

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

  if (textAreaRequirements.test(data.interests) !== true) {
    errors.interests = "These characters: <>{} are not allowed.";
  }

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

module.exports = {
  aboutMeValidation,
  interestsValidation,
  profileIdValidation
};
