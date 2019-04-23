const isEmpty = object => {
  if (
    object === undefined ||
    object === null ||
    (typeof object === "object" && Object.keys(object).length === 0) ||
    (typeof object === "string" && object.length === 0)
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = isEmpty;
