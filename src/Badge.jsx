/** @jsx React.DOM */

var React = require('react');
var ValidComponentChildren = require('./utils/ValidComponentChildren');

var Badge = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <span className={ValidComponentChildren.hasValidComponent(this.props.children) ? 'badge': null}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Badge;