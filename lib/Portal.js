'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _OverlayMixin = require('./OverlayMixin');

var Portal = _react2['default'].createClass({

  displayName: 'Portal',

  propTypes: {
    /**
     * The DOM Node that the Component will render it's children into
     */
    container: _utilsCustomPropTypes2['default'].mountable
  },

  // we use the mixin for now, to avoid duplicating a bunch of code.
  // when the deprecation is removed we need to move the logic here from OverlayMixin
  mixins: [_OverlayMixin.OverlayMixin],

  renderOverlay: function renderOverlay() {
    if (!this.props.children) {
      return null;
    }

    return _react2['default'].Children.only(this.props.children);
  },

  render: function render() {
    return null;
  }
});

exports['default'] = Portal;
module.exports = exports['default'];