/** @jsx React.DOM */

'use strict';

var React = require('react');

var PageHeader = React.createClass({displayName: 'PageHeader',
  render: function () {
    return (
      React.DOM.div( {className:"bs-docs-header", id:"content"},
        React.DOM.div( {className:"container"},
          React.DOM.h1(null, this.props.title),
          React.DOM.p(null, this.props.subTitle)
        )
      )
      );
  }
});

module.exports = PageHeader;