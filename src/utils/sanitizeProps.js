export const omit = (obj, keysToRemove) => {
  if (!obj) {
    throw new Error('Expecting an object');
  }
  if (!keysToRemove || keysToRemove.length === 0) {
    return obj;
  }
  return Object.keys(obj).reduce((accumlator, key) => {
    if (keysToRemove.indexOf(key) === -1) {
      // shallow copy
      accumlator[key] = obj[key];
    }
    return accumlator;
  }, {});
};
