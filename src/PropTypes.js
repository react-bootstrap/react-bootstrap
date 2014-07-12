var React = require('react');

module.exports = {
  componentClass: function (props, propName, componentName) {
    return React.isValidClass(props[propName]);
  }
};