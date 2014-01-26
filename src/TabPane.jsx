/** @jsx React.DOM */

var React       = require('react');
var classSet    = require('react/lib/cx');

var TabPane = React.createClass({
  render: function () {
    var classes = {
      'tab-pane': true,
      'open': this.props.isActive
    };

    return this.transferPropsTo(
      <div className={classSet(classes)}>
        {this.props.children}
      </div>
    );
  }
});

export default = TabPane;