/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');
var BootstrapMixin = require('./BootstrapMixin');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

var PanelGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    collapsable: React.PropTypes.bool,
    activeKey: React.PropTypes.any,
    defaultActiveKey: React.PropTypes.any,
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel-group'
    };
  },

  getInitialState: function () {
    var defaultActiveKey = this.props.defaultActiveKey;

    return {
      activeKey: defaultActiveKey
    };
  },

  render: function () {
    return this.transferPropsTo(
      <div className={classSet(this.getBsClassSet())} onSelect={null}>
        {ValidComponentChildren.map(this.props.children, this.renderPanel)}
      </div>
    );
  },

  renderPanel: function (child) {
    var activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    var props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.props.key,
      ref: child.props.ref
    };

    if (this.props.accordion) {
      props.collapsable = true;
      props.expanded = (child.props.key === activeKey);
      props.onSelect = this.handleSelect;
    }

    return cloneWithProps(
      child,
      props
    );
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function (key) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  }
});

module.exports = PanelGroup;