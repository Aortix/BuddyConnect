const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");
const commonRegex = require("./regex");

const { textAreaRequirements } = commonRegex;

const commentValidation = data => {
  const errors = {};

  if (textAreaRequirements.test(data.comment) !== true) {
    errors.comment = "These characters: <>{} are not allowed.";
  }

  if (!validator.isLength(data.comment, { min: 0, max: 200 })) {
    errors.comment = "Comments cannot exceed 200 characters.";
  }

  if (validator.isEmpty(data.comment)) {
    errors.comment = "There is no comment content.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

module.exports = commentValidation;
