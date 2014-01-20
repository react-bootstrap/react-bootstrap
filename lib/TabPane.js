/** @jsx React.DOM */

var React = require('react/addons');

var TabPane = React.createClass({displayName: 'TabPane',
  render: function () {
    var className = React.addons.classSet({
      'tab-pane': true,
      'open': this.props.isActive
    });

    return this.transferPropsTo(
      React.DOM.div( {className:className}, 
        this.props.children
      )
    );
  }
});

module.exports = TabPane;