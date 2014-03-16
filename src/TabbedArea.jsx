/** @jsx React.DOM */

import React          from './react-es6';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';
import Nav            from './Nav';
import NavItem        from './NavItem';

var TabbedArea = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func
  },

  getInitialState: function () {
    var initialActiveKey = this.props.initialActiveKey;

    if (initialActiveKey == null) {
      var children = this.props.children;
      initialActiveKey =
        Array.isArray(children) ? children[0].props.key : children.props.key;
    }

    return {
      activeKey: initialActiveKey
    };
  },

  render: function () {
    var activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    function hasTab (child) {
      return !!child.props.tab;
    }

    return this.transferPropsTo(
      <div>
        <Nav bsStyle="tabs" activeKey={activeKey} onSelect={this.handleSelect} ref="tabs">
          {utils.modifyChildren(utils.filterChildren(this.props.children, hasTab), this.renderTab)}
        </Nav>
        <div id={this.props.id} className="tab-content" ref="panes">
          {utils.modifyChildren(this.props.children, this.renderPane)}
        </div>
      </div>
    );
  },

  renderPane: function (child) {
    var activeKey =
      this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
    return utils.cloneWithProps(
        child,
        {
          active: (child.props.key === activeKey),
          ref: child.props.ref,
          key: child.props.key
        }
      );
  },

  renderTab: function (child) {
    var key = child.props.key;
    return (
      <NavItem
        ref={'tab' + key}
        key={key}>
        {child.props.tab}
      </NavItem>
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

    this.setState({
      activeKey: key
    });
  }
});

export default = TabbedArea;