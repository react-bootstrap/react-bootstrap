'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _NavDropdown = require('./NavDropdown');

var _NavDropdown2 = _interopRequireDefault(_NavDropdown);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _lodashObjectOmit = require('lodash/object/omit');

var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);

var DropdownButton = (function (_React$Component) {
  _inherits(DropdownButton, _React$Component);

  function DropdownButton(props) {
    _classCallCheck(this, DropdownButton);

    _React$Component.call(this, props);
  }

  DropdownButton.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var navItem = _props.navItem;

    var props = _objectWithoutProperties(_props, ['title', 'navItem']);

    var toggleProps = _lodashObjectOmit2['default'](props, _Dropdown2['default'].ControlledComponent.propTypes);

    if (navItem) {
      return _react2['default'].createElement(_NavDropdown2['default'], this.props);
    }

    return _react2['default'].createElement(
      _Dropdown2['default'],
      props,
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        toggleProps,
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        this.props.children
      )
    );
  };

  return DropdownButton;
})(_react2['default'].Component);

DropdownButton.propTypes = _extends({
  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: _react2['default'].PropTypes.bool,

  /**
   * Specify whether this Dropdown is part of a Nav component
   *
   * @type {bool}
   * @deprecated Use the `NavDropdown` instead.
   */
  navItem: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.bool, function (props) {
    if (props.navItem) {
      _utilsDeprecationWarning2['default']('navItem', 'NavDropdown component', 'https://github.com/react-bootstrap/react-bootstrap/issues/526');
    }
  }]),
  title: _react2['default'].PropTypes.node.isRequired
}, _Dropdown2['default'].propTypes, _BootstrapMixin2['default'].propTypes);

DropdownButton.defaultProps = {
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

exports['default'] = DropdownButton;
module.exports = exports['default'];