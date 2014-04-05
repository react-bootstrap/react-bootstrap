/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

var CSSPage = React.createClass({displayName: 'CSSPage',
  render: function () {
    return (
        React.DOM.div(null,
          NavMain( {activePage:"css"} ),

          PageHeader(
            {title:"CSS",
            subTitle:""} ),

          React.DOM.div( {className:"container bs-docs-container"},
            React.DOM.div( {className:"row"},
              React.DOM.div( {className:"col-md-9", role:"main"},
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {className:"page-header"}, "Example CSS ", React.DOM.small(null, "Example"))
                )
              )
            )
          ),

          PageFooter(null )
        )
      );
  }
});

module.exports = CSSPage;