'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Col = require('./Col');

var _Col2 = _interopRequireDefault(_Col);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _TabContainer = require('./TabContainer');

var _TabContainer2 = _interopRequireDefault(_TabContainer);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var TabContainer = _TabContainer2['default'].ControlledComponent;

function getDefaultActiveKeyFromChildren(children) {
  var defaultActiveKey = undefined;
  _utilsValidComponentChildren2['default'].forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

var Tabs = _react2['default'].createClass({
  displayName: 'Tabs',

  propTypes: {

    /**
     * Mark the Tab with a matching `eventKey` as active.
     *
     * @controllable onSelect
     */
    activeKey: _react2['default'].PropTypes.any,

    /**
     * Navigation style for tabs
     *
     * If not specified, it will be treated as `'tabs'` when vertically
     * positioned and `'pills'` when horizontally positioned.
     */
    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),

    animation: _react2['default'].PropTypes.bool,

    id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

    /**
     * Callback fired when a Tab is selected.
     *
     * ```js
     * function (
     * 	Any eventKey,
     * 	SyntheticEvent event?
     * )
     * ```
     *
     * @controllable activeKey
     */
    onSelect: _react2['default'].PropTypes.func,

    /**
     * Unmount tabs (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: _react2['default'].PropTypes.bool,

    /**
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    position: _react2['default'].PropTypes.oneOf(['top', 'left', 'right']),

    /**
     * Number of grid columns for the tabs if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width.
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    tabWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.object]),
    /**
     * Number of grid columns for the panes if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width. If not
     * specified, it will be treated as `styleMaps.GRID_COLUMNS` minus
     * `tabWidth`.
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    paneWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.object]),
    /**
     * Render without clearfix if horizontally positioned
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    standalone: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'tab',
      animation: true,
      tabWidth: 2,
      position: 'top',
      standalone: false,
      unmountOnExit: false
    };
  },

  render: function render() {
    var _props = this.props;
    var id = _props.id;
    var className = _props.className;
    var style = _props.style;
    var position = _props.position;
    var bsStyle = _props.bsStyle;
    var tabWidth = _props.tabWidth;
    var paneWidth = _props.paneWidth;
    var standalone = _props.standalone;
    var children = _props.children;
    var onSelect = _props.onSelect;
    var activeKey = _props.activeKey;

    var props = _objectWithoutProperties(_props, ['id', 'className', 'style', 'position', 'bsStyle', 'tabWidth', 'paneWidth', 'standalone', 'children', 'onSelect', 'activeKey']);

    activeKey = this.getActiveKey();

    var isHorizontal = position === 'left' || position === 'right';

    if (bsStyle == null) {
      bsStyle = isHorizontal ? 'pills' : 'tabs';
    }

    var containerProps = { id: id, className: className, style: style, activeKey: activeKey, onSelect: onSelect };

    var tabsProps = _extends({}, props, {
      bsStyle: bsStyle,
      bsClass: undefined,
      stacked: isHorizontal,
      ref: 'tabs',
      role: 'tablist'
    });

    var childTabs = _utilsValidComponentChildren2['default'].map(children, this.renderTab);

    var panesProps = {
      ref: 'panes',
      animation: props.animation,
      unmountOnExit: props.unmountOnExit
    };

    var childPanes = children;

    if (isHorizontal) {
      _utilsDeprecationWarning2['default']({
        message: 'Horizontal Tabs (position "left" or "right") are deprecated in favor ' + 'of the more flexible TabContainer component.'
      });

      if (!standalone) {
        containerProps.className = _classnames2['default'](containerProps.className, 'clearfix');
      }

      var _getColProps = this.getColProps({ tabWidth: tabWidth, paneWidth: paneWidth });

      var tabsColProps = _getColProps.tabsColProps;
      var panesColProps = _getColProps.panesColProps;

      var tabs = _react2['default'].createElement(
        _Col2['default'],
        _extends({ componentClass: _Nav2['default'] }, tabsProps, tabsColProps),
        childTabs
      );
      var panes = _react2['default'].createElement(
        _Col2['default'],
        _extends({ componentClass: _TabContent2['default'] }, panesProps, panesColProps),
        childPanes
      );

      if (position === 'left') {
        return _react2['default'].createElement(
          TabContainer,
          containerProps,
          _react2['default'].createElement(
            'div',
            null,
            tabs,
            panes
          )
        );
      }

      return _react2['default'].createElement(
        TabContainer,
        containerProps,
        _react2['default'].createElement(
          'div',
          null,
          panes,
          tabs
        )
      );
    }

    return _react2['default'].createElement(
      TabContainer,
      containerProps,
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          _Nav2['default'],
          tabsProps,
          childTabs
        ),
        _react2['default'].createElement(
          _TabContent2['default'],
          panesProps,
          childPanes
        )
      )
    );
  },

  getActiveKey: function getActiveKey() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var activeKey = props.activeKey;
    var children = props.children;

    return activeKey === undefined ? getDefaultActiveKeyFromChildren(children) : activeKey;
  },

  renderPane: function renderPane(child, index) {
    return _react.cloneElement(child, {
      key: child.key ? child.key : index
    });
  },

  renderTab: function renderTab(child) {
    if (child.props.title == null) {
      return null;
    }

    var _child$props = child.props;
    var eventKey = _child$props.eventKey;
    var title = _child$props.title;
    var disabled = _child$props.disabled;
    var tabClassName = _child$props.tabClassName;

    return _react2['default'].createElement(
      _NavItem2['default'],
      {
        eventKey: eventKey,
        disabled: disabled,
        className: tabClassName
      },
      title
    );
  },

  getColProps: function getColProps(_ref) {
    var tabWidth = _ref.tabWidth;
    var paneWidth = _ref.paneWidth;

    var tabsColProps = undefined;
    if (tabWidth instanceof Object) {
      tabsColProps = tabWidth;
    } else {
      tabsColProps = { xs: tabWidth };
    }

    var panesColProps = undefined;
    if (paneWidth == null) {
      panesColProps = {};
      _Object$keys(tabsColProps).forEach(function (size) {
        panesColProps[size] = _styleMaps2['default'].GRID_COLUMNS - tabsColProps[size];
      });
    } else if (paneWidth instanceof Object) {
      panesColProps = paneWidth;
    } else {
      panesColProps = { xs: paneWidth };
    }

    return { tabsColProps: tabsColProps, panesColProps: panesColProps };
  }

});

exports['default'] = _uncontrollable2['default'](Tabs, { activeKey: 'onSelect' });
module.exports = exports['default'];