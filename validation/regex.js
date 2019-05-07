const commonRegex = {
  nameRequirements: /^[a-z\s]+$/im,
  passwordRequirements: /^[a-z\d-_$&\s]+$/im,
  textAreaRequirements: /^[a-z\d-_$&\s/:;"'|+=^*()!@#%?.,[`~\]\\]+$/im
};

module.exports = commonRegex;
