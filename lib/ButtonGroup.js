'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var ButtonGroup = _react2['default'].createClass({
  displayName: 'ButtonGroup',

  propTypes: {
    vertical: _react2['default'].PropTypes.bool,
    justified: _react2['default'].PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (props) {
      if (props.block && !props.vertical) {
        return new Error('The block property requires the vertical property to be set to have any effect');
      }
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      block: false,
      justified: false,
      vertical: false
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    classes[_utilsBootstrapUtils.prefix(this.props)] = !this.props.vertical;
    classes[_utilsBootstrapUtils.prefix(this.props, 'vertical')] = this.props.vertical;
    classes[_utilsBootstrapUtils.prefix(this.props, 'justified')] = this.props.justified;

    // this is annoying, since the class is `btn-block` not `btn-group-block`
    classes[_utilsBootstrapUtils.prefix(_Button2['default'].defaultProps, 'block')] = this.props.block;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('btn-group', ButtonGroup);
module.exports = exports['default'];