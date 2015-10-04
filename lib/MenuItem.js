'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var MenuItem = (function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    _React$Component.call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  MenuItem.prototype.handleClick = function handleClick(event) {
    if (!this.props.href || this.props.disabled) {
      event.preventDefault();
    }

    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(event, this.props.eventKey);
    }
  };

  MenuItem.prototype.render = function render() {
    if (this.props.divider) {
      return _react2['default'].createElement('li', { role: 'separator', className: 'divider' });
    }

    if (this.props.header) {
      return _react2['default'].createElement(
        'li',
        { role: 'heading', className: 'dropdown-header' },
        this.props.children
      );
    }

    var classes = {
      disabled: this.props.disabled,
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { role: 'presentation',
        className: _classnames2['default'](this.props.className, classes),
        style: this.props.style
      },
      _react2['default'].createElement(
        _SafeAnchor2['default'],
        {
          role: 'menuitem',
          tabIndex: '-1',
          id: this.props.id,
          target: this.props.target,
          title: this.props.title,
          href: this.props.href || '',
          onKeyDown: this.props.onKeyDown,
          onClick: this.handleClick },
        this.props.children
      )
    );
  };

  return MenuItem;
})(_react2['default'].Component);

exports['default'] = MenuItem;

MenuItem.propTypes = {
  disabled: _react2['default'].PropTypes.bool,
  active: _react2['default'].PropTypes.bool,
  divider: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.bool, function (props) {
    if (props.divider && props.children) {
      return new Error('Children will not be rendered for dividers');
    }
  }]),
  eventKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
  header: _react2['default'].PropTypes.bool,
  href: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  title: _react2['default'].PropTypes.string,
  onKeyDown: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func,
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
};

MenuItem.defaultProps = {
  divider: false,
  disabled: false,
  header: false
};
module.exports = exports['default'];