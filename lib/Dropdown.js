'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _lodashCollectionFind = require('lodash/collection/find');

var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

var _lodashObjectOmit = require('lodash/object/omit');

var _lodashObjectOmit2 = _interopRequireDefault(_lodashObjectOmit);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var TOGGLE_REF = 'toggle-btn';

var TOGGLE_ROLE = _DropdownToggle2['default'].defaultProps.bsRole;
exports.TOGGLE_ROLE = TOGGLE_ROLE;
var MENU_ROLE = _DropdownMenu2['default'].defaultProps.bsRole;

exports.MENU_ROLE = MENU_ROLE;

var Dropdown = (function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _React$Component.call(this, props);

    this.Toggle = _DropdownToggle2['default'];

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.extractChildren = this.extractChildren.bind(this);

    this.refineMenu = this.refineMenu.bind(this);
    this.refineToggle = this.refineToggle.bind(this);

    this.childExtractors = [{
      key: 'toggle',
      matches: function matches(child) {
        return child.props.bsRole === TOGGLE_ROLE;
      },
      refine: this.refineToggle
    }, {
      key: 'menu',
      exclusive: true,
      matches: function matches(child) {
        return child.props.bsRole === MENU_ROLE;
      },
      refine: this.refineMenu
    }];

    this.state = {};
  }

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    var menu = this.refs.menu;
    if (this.props.open && menu.focusNext) {
      menu.focusNext();
    }
  };

  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = _domHelpersQueryContains2['default'](_react2['default'].findDOMNode(this.refs.menu), _domHelpersActiveElement2['default'](document));
    }
  };

  Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var menu = this.refs.menu;

    if (this.props.open && !prevProps.open && menu.focusNext) {
      menu.focusNext();
    }

    if (!this.props.open && prevProps.open) {
      // if focus hasn't already moved from the menu lets return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  };

  Dropdown.prototype.render = function render() {
    var children = this.extractChildren();
    var Component = this.props.componentClass;

    var props = _lodashObjectOmit2['default'](this.props, ['id']);

    var rootClasses = {
      open: this.props.open,
      dropdown: !this.props.dropup,
      dropup: this.props.dropup
    };

    return _react2['default'].createElement(
      Component,
      _extends({}, props, {
        tabIndex: '-1',
        className: _classnames2['default'](this.props.className, rootClasses)
      }),
      children
    );
  };

  Dropdown.prototype.toggleOpen = function toggleOpen() {
    var open = !this.props.open;

    if (this.props.onToggle) {
      this.props.onToggle(open);
    }
  };

  Dropdown.prototype.handleClick = function handleClick() {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen();
  };

  Dropdown.prototype.handleKeyDown = function handleKeyDown(event) {
    var _this = this;

    var focusNext = function focusNext() {
      if (_this.refs.menu.focusNext) {
        _this.refs.menu.focusNext();
      }
    };

    switch (event.keyCode) {
      case _keycode2['default'].codes.down:
        if (!this.props.open) {
          this.toggleOpen();
        } else {
          focusNext();
        }
        event.preventDefault();
        break;
      case _keycode2['default'].codes.esc:
      case _keycode2['default'].codes.tab:
        this.handleClose(event);
        break;
      default:
    }
  };

  Dropdown.prototype.handleClose = function handleClose() {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen();
  };

  Dropdown.prototype.focus = function focus() {
    var toggle = _react2['default'].findDOMNode(this.refs[TOGGLE_REF]);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  };

  Dropdown.prototype.extractChildren = function extractChildren() {
    var _this2 = this;

    var open = !!this.props.open;
    var seen = {};

    return _utilsValidComponentChildren2['default'].map(this.props.children, function (child) {
      var extractor = _lodashCollectionFind2['default'](_this2.childExtractors, function (x) {
        return x.matches(child);
      });

      if (extractor) {
        if (seen[extractor.key]) {
          return false;
        }

        seen[extractor.key] = extractor.exclusive;
        child = extractor.refine(child, open);
      }

      return child;
    });
  };

  Dropdown.prototype.refineMenu = function refineMenu(menu, open) {
    var menuProps = {
      ref: 'menu',
      open: open,
      labelledBy: this.props.id,
      pullRight: this.props.pullRight
    };

    menuProps.onClose = _utilsCreateChainedFunction2['default'](menu.props.onClose, this.props.onClose, this.handleClose);

    menuProps.onSelect = _utilsCreateChainedFunction2['default'](menu.props.onSelect, this.props.onSelect, this.handleClose);

    return _react.cloneElement(menu, menuProps, menu.props.children);
  };

  Dropdown.prototype.refineToggle = function refineToggle(toggle, open) {
    var toggleProps = {
      open: open,
      id: this.props.id,
      ref: TOGGLE_REF
    };

    toggleProps.onClick = _utilsCreateChainedFunction2['default'](toggle.props.onClick, this.handleClick);

    toggleProps.onKeyDown = _utilsCreateChainedFunction2['default'](toggle.props.onKeyDown, this.handleKeyDown);

    return _react.cloneElement(toggle, toggleProps, toggle.props.children);
  };

  return Dropdown;
})(_react2['default'].Component);

Dropdown.Toggle = _DropdownToggle2['default'];

Dropdown.TOGGLE_REF = TOGGLE_REF;

Dropdown.defaultProps = {
  componentClass: _ButtonGroup2['default']
};

Dropdown.propTypes = {
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: _react2['default'].PropTypes.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

  componentClass: _utilsCustomPropTypes2['default'].elementType,

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle/>` or a `<Dropdown.Menu/>`.
   * @type {node}
   */
  children: _utilsCustomPropTypes2['default'].all([_utilsCustomPropTypes2['default'].requiredRoles(TOGGLE_ROLE, MENU_ROLE), _utilsCustomPropTypes2['default'].exclusiveRoles(MENU_ROLE)]),

  /**
   * Whether or not component is disabled.
   */
  disabled: _react2['default'].PropTypes.bool,

  /**
   * Align the menu to the right  side of the Dropdown toggle
   */
  pullRight: _react2['default'].PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: _react2['default'].PropTypes.bool,

  /**
   * A callback fired when the Dropdown closes.
   */
  onClose: _react2['default'].PropTypes.func,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value.
   *
   * ```js
   * function(Boolean isOpen) {}
   * ```
   * @controllable open
   */
  onToggle: _react2['default'].PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * function(Object event, Any eventKey)
   * ```
   */
  onSelect: _react2['default'].PropTypes.func
};

Dropdown = _uncontrollable2['default'](Dropdown, { open: 'onToggle' });

Dropdown.Toggle = _DropdownToggle2['default'];
Dropdown.Menu = _DropdownMenu2['default'];

exports['default'] = Dropdown;