'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaBody = _react2['default'].createClass({
  displayName: 'Media.Body',
  propTypes: {
    /**
     * You can use a custom element for the media body
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media-body') }));
  }
});

exports['default'] = MediaBody;
module.exports = exports['default'];