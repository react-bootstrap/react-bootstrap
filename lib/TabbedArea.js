/** @jsx React.DOM */

var React              = require('react/addons');
var BootstrapMixin     = require('./BootstrapMixin');
var ObjectToPropsMixin = require('./ObjectToPropsMixin');
var utils              = require('./utils');
var Tab                = require('./Tab');
var TabPane            = require('./TabPane');

var TabbedArea = React.createClass({displayName: 'TabbedArea',
  mixins: [BootstrapMixin, ObjectToPropsMixin],

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
      this.transferObjectAsPropsTo(
        child.props,
        TabPane({
          isActive: isActive,
          ref: 'pane' + i,
          key: i
        }, child.props.children)
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
      React.DOM.div(null, 
        React.DOM.ul( {className:"nav nav-tabs"}, 
          this.tabs
        ),
        React.DOM.div( {id:this.props.id}, 
          this.panes
        )
      )
    );
  }
});

module.exports = TabbedArea;