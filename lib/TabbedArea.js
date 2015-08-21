'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var panelId = function panelId(props, child) {
  return child.props.id ? child.props.id : props.id && props.id + '___panel___' + child.props.eventKey;
};
var tabId = function tabId(props, child) {
  return child.props.id ? child.props.id + '___tab' : props.id && props.id + '___tab___' + child.props.eventKey;
};

function getDefaultActiveKeyFromChildren(children) {
  var defaultActiveKey = undefined;

  _utilsValidComponentChildren2['default'].forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

var TabbedArea = _react2['default'].createClass({
  displayName: 'TabbedArea',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    activeKey: _react2['default'].PropTypes.any,
    defaultActiveKey: _react2['default'].PropTypes.any,
    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),
    animation: _react2['default'].PropTypes.bool,
    id: _react2['default'].PropTypes.string,
    onSelect: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsStyle: 'tabs',
      animation: true
    };
  },

  getInitialState: function getInitialState() {
    var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      (function () {
        // check if the 'previousActiveKey' child still exists
        var previousActiveKey = _this.props.activeKey;
        _react2['default'].Children.forEach(nextProps.children, function (child) {
          if (_react2['default'].isValidElement(child)) {
            if (child.props.eventKey === previousActiveKey) {
              _this.setState({
                previousActiveKey: previousActiveKey
              });
              return;
            }
          }
        });
      })();
    }
  },

  handlePaneAnimateOutEnd: function handlePaneAnimateOutEnd() {
    this.setState({
      previousActiveKey: null
    });
  },

  render: function render() {
    var _props = this.props;
    var id = _props.id;

    var props = _objectWithoutProperties(_props, ['id']);

    function renderTabIfSet(child) {
      return child.props.tab != null ? this.renderTab(child) : null;
    }

    var nav = _react2['default'].createElement(
      _Nav2['default'],
      _extends({}, props, { activeKey: this.getActiveKey(), onSelect: this.handleSelect, ref: 'tabs' }),
      _utilsValidComponentChildren2['default'].map(this.props.children, renderTabIfSet, this)
    );

    return _react2['default'].createElement(
      'div',
      null,
      nav,
      _react2['default'].createElement(
        'div',
        { id: id, className: 'tab-content', ref: 'panes' },
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderPane)
      )
    );
  },

  getActiveKey: function getActiveKey() {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },

  renderPane: function renderPane(child, index) {
    var previousActiveKey = this.state.previousActiveKey;

    var shouldPaneBeSetActive = child.props.eventKey === this.getActiveKey();
    var thereIsNoActivePane = previousActiveKey == null;

    var paneIsAlreadyActive = previousActiveKey != null && child.props.eventKey === previousActiveKey;

    return _react.cloneElement(child, {
      active: shouldPaneBeSetActive && (thereIsNoActivePane || !this.props.animation),
      id: panelId(this.props, child),
      'aria-labelledby': tabId(this.props, child),
      key: child.key ? child.key : index,
      animation: this.props.animation,
      onAnimateOutEnd: paneIsAlreadyActive ? this.handlePaneAnimateOutEnd : null
    });
  },

  renderTab: function renderTab(child) {
    var _child$props = child.props;
    var eventKey = _child$props.eventKey;
    var className = _child$props.className;
    var tab = _child$props.tab;
    var disabled = _child$props.disabled;

    return _react2['default'].createElement(
      _NavItem2['default'],
      {
        linkId: tabId(this.props, child),
        ref: 'tab' + eventKey,
        'aria-controls': panelId(this.props, child),
        eventKey: eventKey,
        className: className,
        disabled: disabled },
      tab
    );
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function handleSelect(selectedKey) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(selectedKey);
      this._isChanging = false;
      return;
    }

    // if there is no external handler, then use embedded one
    var previousActiveKey = this.getActiveKey();
    if (selectedKey !== previousActiveKey) {
      this.setState({
        activeKey: selectedKey,
        previousActiveKey: previousActiveKey
      });
    }
  }
});

exports['default'] = TabbedArea;
module.exports = exports['default'];