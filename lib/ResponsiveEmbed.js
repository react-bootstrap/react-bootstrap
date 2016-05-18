'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var ResponsiveEmbed = (function (_React$Component) {
  _inherits(ResponsiveEmbed, _React$Component);

  function ResponsiveEmbed() {
    _classCallCheck(this, ResponsiveEmbed);

    _React$Component.apply(this, arguments);
  }

  ResponsiveEmbed.prototype.render = function render() {
    var _props = this.props;
    var bsClass = _props.bsClass;
    var className = _props.className;
    var a16by9 = _props.a16by9;
    var a4by3 = _props.a4by3;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['bsClass', 'className', 'a16by9', 'a4by3', 'children']);

    process.env.NODE_ENV !== 'production' ? _warning2['default'](!(!a16by9 && !a4by3), '`a16by9` or `a4by3` attribute must be set.') : undefined;
    process.env.NODE_ENV !== 'production' ? _warning2['default'](!(a16by9 && a4by3), 'Either `a16by9` or `a4by3` attribute can be set. Not both.') : undefined;

    var aspectRatio = {
      'embed-responsive-16by9': a16by9,
      'embed-responsive-4by3': a4by3
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](bsClass, aspectRatio) },
      _react.cloneElement(children, _extends({}, props, {
        className: _classnames2['default'](className, 'embed-responsive-item')
      }))
    );
  };

  return ResponsiveEmbed;
})(_react2['default'].Component);

ResponsiveEmbed.defaultProps = {
  bsClass: 'embed-responsive',
  a16by9: false,
  a4by3: false
};

ResponsiveEmbed.propTypes = {
  /**
   * bootstrap className
   * @private
   */
  bsClass: _react.PropTypes.string,
  /**
   * This component accepts only one child element
   */
  children: _react.PropTypes.element.isRequired,
  /**
   * 16by9 aspect ratio
   */
  a16by9: _react.PropTypes.bool,
  /**
   * 4by3 aspect ratio
   */
  a4by3: _react.PropTypes.bool
};

exports['default'] = ResponsiveEmbed;
module.exports = exports['default'];