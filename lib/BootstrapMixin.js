var React     = require('react/addons');
var merge     = require('react/lib/merge');
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

  extendClassName: function (extraClasses) {
    var prefix,
        className,
        classes = this.getClassSetFromClassName(),
        bsClass,
        bsStyle,
        bsSize;

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

    if (extraClasses) {
      classes = merge(classes, extraClasses);
    }

    className = React.addons.classSet(classes);

    return className.replace(/\s+/, ' ');
  }
};

module.exports = BootstrapMixin;