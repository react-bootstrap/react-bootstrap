/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

var HomePage = React.createClass({displayName: 'HomePage',
  render: function () {
    return (
        React.DOM.div(null,
          NavMain( {activePage:"home"} ),

          React.DOM.main( {className:"bs-docs-masthead", id:"content", role:"main"},
            React.DOM.div( {className:"container"},
              React.DOM.span( {className:"bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"}),
              React.DOM.p( {className:"lead"}, "The most popular front-end framework, rebuilt for React.")
            )
          ),

          PageFooter(null )
        )
      );
  }
});

module.exports = HomePage;