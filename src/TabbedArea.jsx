/** @jsx React.DOM */

var React              = require('react');
var BootstrapMixin     = require('./BootstrapMixin');
var utils              = require('./utils');
var Tab                = require('./Tab');

var TabbedArea = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render: function () {
    var children = this.props.children;

    if (!Array.isArray(children)) {
      children = [children]
    }

    function hasTab (child) {
      return !!child.props.tab;
    }

    return this.transferPropsTo(
      <div>
        <ul className="nav nav-tabs" ref="tabs">
          {children.filter(hasTab).map(this.renderTab)}
        </ul>
        <div id={this.props.id} ref="panes">
          {children.map(this.renderPane)}
        </div>
      </div>
    );
  },

  renderPane: function (child) {
    return utils.cloneWithProps(
        child,
        {
          isActive: (child.props.key === this.props.activeKey)
        }
      );
  },

  renderTab: function (child) {
    var key = child.props.key;
    return (
      <Tab
        id={child.props.id}
        ref={'tab' + key}
        key={key}
        isActive={key === this.props.activeKey}
        onSelect={this.handleSelect.bind(this, key)}>
        {child.props.tab}
      </Tab>
    );
  },

  handleSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }
  }
});

module.exports = TabbedArea;