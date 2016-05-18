'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaRight = _react2['default'].createClass({
  displayName: 'Media.Right',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render: function render() {
    var _classNames;

    var _props = this.props;
    var align = _props.align;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['align', 'className']);

    var classes = _classnames2['default'](className, 'media-right', (_classNames = {}, _classNames['media-' + align] = Boolean(align), _classNames));

    // Only add the media-alignment class if align is passed in props
    return _react2['default'].createElement('div', _extends({}, props, { className: classes }));
  }
});

exports['default'] = MediaRight;
module.exports = exports['default'];