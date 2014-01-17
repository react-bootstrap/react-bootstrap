var React = require('react/addons');
var constants = require('./constants');

var BootstrapMixin = {
  propTypes: {
    bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
    bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
    bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES)),
    bsVariation: React.PropTypes.string
  },

  getClassSetFromString: function (className) {
    var classes = {};

    className = className || '';

    className.split(' ').map(
      function (cssClass) {
        if (cssClass) {
          classes[cssClass] = true;
        }
      }
    );

    return classes;
  },

  getClassSetFromClassName: function () {
    return this.getClassSetFromString(this.props.className);
  },

  extendClassName: function () {
    var prefix,
        classes = this.getClassSetFromClassName(),
        bsClass,
        bsStyle,
        bsSize

    bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
    if (bsClass) {
      classes[bsClass] = true;

      prefix = bsClass + '-';

      bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
      if (bsSize) {
        classes[prefix + bsSize] = true;
      }
      bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
      if (this.props.bsStyle) {
        classes[prefix + bsStyle] = true;
      }

      if (this.props.bsVariation) {
        classes[prefix + this.props.bsVariation] = true;
      }
    }

    return React.addons.classSet(classes);
  }
};

module.exports = BootstrapMixin;