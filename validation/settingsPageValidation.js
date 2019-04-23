const validator = require("validator");
const isEmpty = require("./../client/src/utilities/isEmpty");

var alphanumberic = /^[a-z\d\-_\s]+$/i;

const updateNameValidation = data => {
  const errors = {};

  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters.";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is empty.";
  }
  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

const updateEmailValidation = data => {
  const errors = {};

  if (!validator.isLength(data.email, { min: 5, max: 30 })) {
    errors.email = "Email must be between 5 and 30 characters.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Must be a valid email address.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is empty.";
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

const updatePasswordValidation = data => {
  const errors = {};

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is empty.";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }

  return {
    errors: errors,
    noErrors: isEmpty(errors)
  };
};

const deleteAccountValidation = data => {
  const errors = {};

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

module.exports = {
  updateNameValidation,
  updateEmailValidation,
  updatePasswordValidation,
  deleteAccountValidation
};
