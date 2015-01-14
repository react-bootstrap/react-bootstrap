var React = require('react');
var joinClasses = require('./utils/joinClasses');

var PageHeader = React.createClass({displayName: "PageHeader",

  render: function () {
    return (
      React.createElement("div", React.__spread({},  this.props, {className: joinClasses(this.props.className, 'page-header')}), 
        React.createElement("h1", null, this.props.children)
      )
    );
  }
});

module.exports = PageHeader;