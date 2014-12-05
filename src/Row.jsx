var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Row = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={joinClasses(this.props.className, 'row')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

module.exports = Row;