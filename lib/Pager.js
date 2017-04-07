'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PagerItem = require('./PagerItem');

var _PagerItem2 = _interopRequireDefault(_PagerItem);

var _bootstrapUtils = require('./utils/bootstrapUtils');

var _createChainedFunction = require('./utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _ValidComponentChildren = require('./utils/ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = {
  onSelect: _react2['default'].PropTypes.func
};

var Pager = function (_React$Component) {
  (0, _inherits3['default'])(Pager, _React$Component);

  function Pager() {
    (0, _classCallCheck3['default'])(this, Pager);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  Pager.prototype.render = function render() {
    var _props = this.props,
        onSelect = _props.onSelect,
        className = _props.className,
        children = _props.children,
        props = (0, _objectWithoutProperties3['default'])(_props, ['onSelect', 'className', 'children']);

    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);

    return _react2['default'].createElement(
      'ul',
      (0, _extends3['default'])({}, elementProps, {
        className: (0, _classnames2['default'])(className, classes)
      }),
      _ValidComponentChildren2['default'].map(children, function (child) {
        return (0, _react.cloneElement)(child, {
          onSelect: (0, _createChainedFunction2['default'])(child.props.onSelect, onSelect)
        });
      })
    );
  };

  return Pager;
}(_react2['default'].Component);

Pager.propTypes = propTypes;

Pager.Item = _PagerItem2['default'];

exports['default'] = (0, _bootstrapUtils.bsClass)('pager', Pager);
module.exports = exports['default'];