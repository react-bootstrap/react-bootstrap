/** @jsx React.DOM */

var React = require('react');
var PanelGroup = require('./PanelGroup');

var Accordion = React.createClass({
  render: function () {
    return this.transferPropsTo(
      <PanelGroup accordion={true}>
        {this.props.children}
      </PanelGroup>
    );
  }
});

module.exports = Accordion;