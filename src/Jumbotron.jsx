/** @jsx React.DOM */

var React = require('react');

var Jumbotron = React.createClass({

  render: function () {
    return this.transferPropsTo(
      <div className='jumbotron'>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Jumbotron;