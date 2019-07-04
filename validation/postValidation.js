const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");
const commonRegex = require("./regex");

const { textAreaRequirements } = commonRegex;

const getPostsValidation = data => {
  const errors = {};

  if (data.amount && !validator.isNumeric(data.amount.toString())) {
    errors.misc = "Amount must be a number.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

const postValidation = data => {
  const errors = {};

  if (textAreaRequirements.test(data.post) !== true) {
    errors.post = "These characters: <>{} are not allowed.";
  }

  if (!validator.isLength(data.post, { min: 0, max: 200 })) {
    errors.post = "Post cannot exceed 200 characters.";
  }

  if (validator.isEmpty(data.post)) {
    errors.post = "There is no post content.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

module.exports = { getPostsValidation, postValidation };
