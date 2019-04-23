const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");

var alphanumberic = /^[a-z\d\-_\s]+$/i;

const commentValidation = data => {
  const errors = {};

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
