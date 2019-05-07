const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");
const commonRegex = require("./regex");

const { passwordRequirements } = commonRegex;

const loginValidation = data => {
  const errors = {};

  if (data == undefined || data == null) {
    errors.misc =
      "The data sent to the server is undefined. Please wait a minute and try again.";
  }

  if (!validator.isLength(data.email, { min: 5, max: 30 })) {
    errors.email = "Email must be between 5 and 30 characters.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Must be a valid email address.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is empty.";
  }

  if (passwordRequirements.test(data.password) !== true) {
    errors.password =
      "Passwords can only contain numbers, letters, spaces, and -_$&";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is empty.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

module.exports = loginValidation;
