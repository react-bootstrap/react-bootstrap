var React = require('react');
var joinClasses = require('react/lib/joinClasses');

var PageHeader = React.createClass({

  render: function () {
    return (
      <div {...this.props} className={joinClasses(this.props.className, 'page-header')}>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

module.exports = PageHeader;