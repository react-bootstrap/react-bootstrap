'use strict';

exports.__esModule = true;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

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

var _bootstrapUtils = require('./utils/bootstrapUtils');

var _StyleConfig = require('./utils/StyleConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = {
  active: _react2['default'].PropTypes.any,
  disabled: _react2['default'].PropTypes.any,
  header: _react2['default'].PropTypes.node,
  listItem: _react2['default'].PropTypes.bool,
  onClick: _react2['default'].PropTypes.func,
  href: _react2['default'].PropTypes.string,
  type: _react2['default'].PropTypes.string
};

var defaultProps = {
  listItem: false
};

var ListGroupItem = function (_React$Component) {
  (0, _inherits3['default'])(ListGroupItem, _React$Component);

  function ListGroupItem() {
    (0, _classCallCheck3['default'])(this, ListGroupItem);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  ListGroupItem.prototype.renderHeader = function renderHeader(header, headingClassName) {
    if (_react2['default'].isValidElement(header)) {
      return (0, _react.cloneElement)(header, {
        className: (0, _classnames2['default'])(header.props.className, headingClassName)
      });
    }

    return _react2['default'].createElement(
      'h4',
      { className: headingClassName },
      header
    );
  };

  ListGroupItem.prototype.render = function render() {
    var _props = this.props;
    var active = _props.active;
    var disabled = _props.disabled;
    var className = _props.className;
    var header = _props.header;
    var listItem = _props.listItem;
    var children = _props.children;
    var props = (0, _objectWithoutProperties3['default'])(_props, ['active', 'disabled', 'className', 'header', 'listItem', 'children']);

    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);

    var bsProps = _splitBsProps[0];
    var elementProps = _splitBsProps[1];


    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
      active: active,
      disabled: disabled
    });

    var Component = void 0;

    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }

    elementProps.className = (0, _classnames2['default'])(className, classes);

    // TODO: Deprecate `header` prop.
    if (header) {
      return _react2['default'].createElement(
        Component,
        elementProps,
        this.renderHeader(header, (0, _bootstrapUtils.prefix)(bsProps, 'heading')),
        _react2['default'].createElement(
          'p',
          { className: (0, _bootstrapUtils.prefix)(bsProps, 'text') },
          children
        )
      );
    }

    return _react2['default'].createElement(
      Component,
      elementProps,
      children
    );
  };

  return ListGroupItem;
}(_react2['default'].Component);

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

exports['default'] = (0, _bootstrapUtils.bsClass)('list-group-item', (0, _bootstrapUtils.bsStyles)((0, _values2['default'])(_StyleConfig.State), ListGroupItem));
module.exports = exports['default'];