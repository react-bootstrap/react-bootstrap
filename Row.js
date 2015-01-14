var React = require('react');
var joinClasses = require('./utils/joinClasses');

var Row = React.createClass({displayName: "Row",
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
      React.createElement(ComponentClass, React.__spread({},  this.props, {className: joinClasses(this.props.className, 'row')}), 
        this.props.children
      )
    );
  }
});

module.exports = Row;