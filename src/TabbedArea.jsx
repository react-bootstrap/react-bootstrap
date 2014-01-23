/** @jsx React.DOM */

var React              = require('react');
var BootstrapMixin     = require('./BootstrapMixin');
var utils              = require('./utils');
var Tab                = require('./Tab');

var TabbedArea = React.createClass({
  mixins: [BootstrapMixin],

  tabs : [],

  panes: [],

  handleSelect: function (i) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(i);
    }
  },

  createChild: function (child, i) {
    var isActive = (i === this.props.activeIndex);

    this.panes.push(
      utils.cloneWithProps(
        child,
        {
          isActive: isActive
        }
      )
    );

    if (child.props.tab) {
      this.panes.push(Tab({
        id: child.props.id,
        ref: 'tab' + i,
        key: 'tab' + i,
        isActive: isActive,
        onSelect: this.handleSelect.bind(this, i)
      }, child.props.tab));
    }
  },

  createChildren: function () {
    var children = this.props.children;

    if (!utils.isArray(children)) {
      children = [children]
    }

    this.tabs = [];
    this.panes = [];

    this.props.children.forEach(this.createChild);
  },

  render: function () {
    this.createChildren();

    return this.transferPropsTo(
      <div>
        <ul className="nav nav-tabs" ref="tabs">
          {this.tabs}
        </ul>
        <div id={this.props.id} ref="panes">
          {this.panes}
        </div>
      </div>
    );
  }
});

module.exports = TabbedArea;