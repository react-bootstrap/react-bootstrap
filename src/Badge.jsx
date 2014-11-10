/** @jsx React.DOM */

var React = require('react/addons');
var cx    = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');

var Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool,
  },

  render: function () {
    var classes = {
      'pull-right': this.props.pullRight,
      'badge': this.props.children != null
    };
    classes[this.props.className] = true;
    return (
      <span {...this.props} className={React.addons.classSet(classes)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Badge;
