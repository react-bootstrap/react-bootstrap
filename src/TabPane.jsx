/** @jsx React.DOM */

var React = require('react/addons');

var TabPane = React.createClass({
  render: function () {
    var className = React.addons.classSet({
      'tab-pane': true,
      'open': this.props.isActive
    });

    return this.transferPropsTo(
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TabPane;