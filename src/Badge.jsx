var React = require('react');

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var classSet = require('classnames');

var Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  hasContent: function () {
    return ValidComponentChildren.hasValidComponent(this.props.children) ||
      (typeof this.props.children === 'string') ||
      (typeof this.props.children === 'number')
  },

  render: function () {
    var classes = {
      'pull-right': this.props.pullRight,
      'badge': this.hasContent()
    };
    return (
      <span
        {...this.props}
        className={classSet(this.props.className, classes)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Badge;
