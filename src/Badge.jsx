var React = require('react');
var joinClasses = require('./utils/joinClasses');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var classSet = require('./utils/classSet');

var Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  render: function () {
    var classes = {
      'pull-right': this.props.pullRight,
      'badge': (ValidComponentChildren.hasValidComponent(this.props.children)
        || (typeof this.props.children === 'string'))
    };
    return (
      <span
        {...this.props}
        className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Badge;
