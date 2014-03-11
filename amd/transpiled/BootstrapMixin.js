define(
  ["./react-es6","./constants","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var React = __dependency1__["default"];
    var constants = __dependency2__["default"];

    var BootstrapMixin = {
      propTypes: {
        bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
        bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
        bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES))
      },

      getBsClassSet: function () {
        var classes = {};

        var bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
        if (bsClass) {
          classes[bsClass] = true;

          var prefix = bsClass + '-';

          var bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
          if (bsSize) {
            classes[prefix + bsSize] = true;
          }

          var bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
          if (this.props.bsStyle) {
            classes[prefix + bsStyle] = true;
          }
        }

        return classes;
      }
    };

    __exports__["default"] = BootstrapMixin;
  });