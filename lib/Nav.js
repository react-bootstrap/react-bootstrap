'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsTabUtils = require('./utils/tabUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var Nav = (function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav() {
    _classCallCheck(this, Nav);

    _React$Component.apply(this, arguments);
  }

  Nav.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this._needsRefocus) {
      var ul = this.refs.ul && _reactDom2['default'].findDOMNode(this.refs.ul);
      var tabs = ul ? ul.children || [] : [];
      var tabIdx = this.eventKeys().indexOf(this.getActiveKey());

      this._needsRefocus = false;

      if (tabIdx !== -1) {
        var tabNode = tabs[tabIdx];

        if (tabNode && tabNode.firstChild) {
          tabNode.firstChild.focus();
        }
      }
    }
  };

  Nav.prototype.render = function render() {
    var className = this.props.className;

    var isNavbar = this.props.navbar != null ? this.props.navbar : this.context.$bs_navbar;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    classes[_utilsBootstrapUtils.prefix(this.props, 'stacked')] = this.props.stacked;
    classes[_utilsBootstrapUtils.prefix(this.props, 'justified')] = this.props.justified;

    if (isNavbar) {
      var bsClass = this.context.$bs_navbar_bsClass || 'navbar';

      classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'nav')] = true;
      classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'right')] = this.props.pullRight;
      classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'left')] = this.props.pullLeft;
    } else {
      classes['pull-right'] = this.props.pullRight;
      classes['pull-left'] = this.props.pullLeft;
    }

    var list = _react2['default'].createElement(
      'ul',
      _extends({ ref: 'ul'
      }, this.props, {
        role: this.getNavRole(),
        className: _classnames2['default'](className, classes)
      }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem, this)
    );

    return list;
  };

  Nav.prototype.renderNavItem = function renderNavItem(child, index) {
    var onSelect = _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect);
    var active = this.isChildActive(child);
    var tabProps = this.getTabProps(child, active, onSelect);

    return _react.cloneElement(child, _extends({
      active: active,
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: onSelect,
      key: child.key || index,
      navItem: true
    }, tabProps));
  };

  Nav.prototype.getActiveKey = function getActiveKey() {
    var context = this.context.$bs_tabcontainer;
    if (!context) {
      return this.props.activeKey;
    }

    process.env.NODE_ENV !== 'production' ? _warning2['default'](!(this.props.activeKey != null || this.props.activeHref), 'Specifing a Nav `activeKey` or `activeHref` prop in the context of a `TabContainer` is not supported. ' + 'Instead use `<TabContainer activeKey={' + this.props.activeKey + '} />`') : undefined;

    return context.activeKey;
  };

  Nav.prototype.isChildActive = function isChildActive(child) {
    var activeKey = this.getActiveKey();

    if (this.context.$bs_tabcontainer) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!child.props.active, 'Specifying a NavItem `active` prop in the context of a `TabContainer` is not supported. Instead ' + 'use `<TabContainer activeKey={' + child.props.eventKey + '} />`') : undefined;

      return child.props.eventKey === activeKey;
    }

    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  };

  Nav.prototype.getTabProps = function getTabProps(child, isActive, onSelect) {
    var navRole = this.getNavRole();
    var context = this.context.$bs_tabcontainer;

    if (!context && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    var _child$props = child.props;
    var id = _child$props.id;
    var controls = _child$props['aria-controls'];
    var eventKey = _child$props.eventKey;
    var role = _child$props.role;
    var onKeyDown = _child$props.onKeyDown;
    var _child$props$tabIndex = _child$props.tabIndex;
    var tabIndex = _child$props$tabIndex === undefined ? 0 : _child$props$tabIndex;

    if (context && context.getId) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!(id || controls), 'In the context of a TabContainer, NavItems are given generated `id` and `aria-controls` ' + 'attributes for the sake of proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` prop to the parent TabContainer.') : undefined;

      id = context.getId(eventKey, _utilsTabUtils.TAB) || null;
      controls = context.getId(eventKey, _utilsTabUtils.PANE) || null;
      onSelect = _utilsCreateChainedFunction2['default'](onSelect, context.onSelect);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = _utilsCreateChainedFunction2['default'](this.handleTabKeyDown.bind(this, onSelect || function () {}), onKeyDown);
      tabIndex = isActive ? tabIndex : -1;
    }

    return {
      onSelect: onSelect,
      id: id,
      role: role,
      onKeyDown: onKeyDown,
      'aria-controls': controls,
      tabIndex: tabIndex
    };
  };

  Nav.prototype.handleTabKeyDown = function handleTabKeyDown(onSelect, event) {
    var keys = this.eventKeys();
    var currentKey = this.getActiveKey() || keys[0];
    var next = undefined;

    switch (event.keyCode) {

      case _keycode2['default'].codes.left:
      case _keycode2['default'].codes.up:
        next = _utilsTabUtils.nextEnabled(this.props.children, currentKey, keys, false);

        if (next && next !== currentKey) {
          event.preventDefault();
          onSelect(next);
          this._needsRefocus = true;
        }
        break;
      case _keycode2['default'].codes.right:
      case _keycode2['default'].codes.down:
        next = _utilsTabUtils.nextEnabled(this.props.children, currentKey, keys, true);

        if (next && next !== currentKey) {
          event.preventDefault();
          onSelect(next);
          this._needsRefocus = true;
        }
        break;
      default:
    }
  };

  Nav.prototype.eventKeys = function eventKeys() {
    var keys = [];
    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (_ref) {
      var eventKey = _ref.props.eventKey;
      return keys.push(eventKey);
    });
    return keys;
  };

  Nav.prototype.getNavRole = function getNavRole() {
    return this.props.role || (this.context.$bs_tabcontainer ? 'tablist' : null);
  };

  return Nav;
})(_react2['default'].Component);

Nav.propTypes = {

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: _react2['default'].PropTypes.string,

  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: _react2['default'].PropTypes.any,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: _react2['default'].PropTypes.bool,

  justified: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (_ref2) {
    var justified = _ref2.justified;
    var navbar = _ref2.navbar;
    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
  }),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   */
  onSelect: _react2['default'].PropTypes.func,

  /**
   * CSS classes for the wrapper `nav` element
   */
  className: _react2['default'].PropTypes.string,
  /**
   * HTML id for the wrapper `nav` element
   */
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will be set
   * to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to the
   * ARIA authoring practices for tabs: https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: _react2['default'].PropTypes.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: _react2['default'].PropTypes.bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: _react2['default'].PropTypes.bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: _react2['default'].PropTypes.bool
};

Nav.contextTypes = {
  $bs_navbar: _react2['default'].PropTypes.bool,
  $bs_navbar_bsClass: _react2['default'].PropTypes.string,

  $bs_tabcontainer: _react2['default'].PropTypes.shape({
    activeKey: _react2['default'].PropTypes.any,
    onSelect: _react2['default'].PropTypes.func,
    getId: _react2['default'].PropTypes.func
  })
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('nav', _utilsBootstrapUtils.bsStyles(['tabs', 'pills'], Nav));
module.exports = exports['default'];