import React from './react-es6';

export default = {
  componentClass: function (props, propName, componentName) {
    return React.isValidClass(props[propName]);
  }
};