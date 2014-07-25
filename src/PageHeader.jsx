/** @jsx React.DOM */

var React = require('react');

var PageHeader = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <div className='page-header'>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

module.exports = PageHeader;