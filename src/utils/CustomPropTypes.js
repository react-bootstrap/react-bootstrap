var React = require('react');

var CustomPropTypes = {
  /**
   * Checks whether a prop is a valid React class
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  componentClass: function (props, propName, componentName) {
    if (!React.isValidClass(props[propName])) {
      return new Error('Invalid `' + propName + '` prop in `' + componentName + '`, expected be ' +
        'a valid React class');
    }
  },

  /**
   * Checks whether a prop provides a DOM element
   *
   * The element can be provided in two forms:
   * - Directly passed
   * - Or passed an object which has a `getDOMNode` method which will return the required DOM element
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  mountable: function (props, propName, componentName) {
    if (typeof props[propName] !== 'object' ||
      typeof props[propName].getDOMNode !== 'function' && props[propName].nodeType !== 1) {
      return new Error('Invalid `' + propName + '` prop in `' + componentName + '`, expected be ' +
        'a DOM element or an object that has a `getDOMNode` method');
    }
  }
};

module.exports = CustomPropTypes;