var React = require('react/addons');
var constants = require('./constants');

var BootstrapMixin = {
  propTypes: {
    bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
    bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
    bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES))
  },

  extendClassName: function () {
    var prefix,
        classes = {},
        bsClass,
        bsStyle,
        bsSize;

    if (this.props.className) {
      this.props.className.split(' ').map(
        function (cssClass) {
          classes[cssClass] = true;
        }
      );
    }

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
    }

    return React.addons.classSet(classes);
  }
};

module.exports = BootstrapMixin;