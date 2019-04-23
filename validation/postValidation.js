const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");

var alphanumberic = /^[a-z\d\-_\s]+$/i;

const postValidation = data => {
  const errors = {};

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

module.exports = postValidation;
