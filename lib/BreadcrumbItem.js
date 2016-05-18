'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var BreadcrumbItem = _react2['default'].createClass({
  displayName: 'BreadcrumbItem',

  propTypes: {
    /**
     * If set to true, renders `span` instead of `a`
     */
    active: _react2['default'].PropTypes.bool,
    /**
     * HTML id for the wrapper `li` element
     */
    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    /**
     * HTML id for the inner `a` element
     */
    linkId: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    /**
     * `href` attribute for the inner `a` element
     */
    href: _react2['default'].PropTypes.string,
    /**
     * `title` attribute for the inner `a` element
     */
    title: _react2['default'].PropTypes.node,
    /**
     * `target` attribute for the inner `a` element
     */
    target: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false
    };
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var className = _props.className;
    var id = _props.id;
    var linkId = _props.linkId;
    var children = _props.children;
    var href = _props.href;
    var title = _props.title;
    var target = _props.target;

    var props = _objectWithoutProperties(_props, ['active', 'className', 'id', 'linkId', 'children', 'href', 'title', 'target']);

    var linkProps = {
      href: href,
      title: title,
      target: target,
      id: linkId
    };

    return _react2['default'].createElement(
      'li',
      { id: id, className: _classnames2['default'](className, { active: active }) },
      active ? _react2['default'].createElement(
        'span',
        props,
        children
      ) : _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, props, linkProps),
        children
      )
    );
  }
});

exports['default'] = BreadcrumbItem;
module.exports = exports['default'];