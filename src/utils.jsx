module.exports = {
  isArray: function (obj) {
    return (Object.prototype.toString.call(obj) === '[object Array]');
  }
}