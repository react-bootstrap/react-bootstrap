/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

var NotFoundPage = React.createClass({displayName: 'NotFoundPage',
  render: function () {
    return (
        React.DOM.div(null,
          NavMain( {activePage:""} ),

          PageHeader(
            {title:"404",
            subTitle:"Hmmm this is awkward."} ),

          PageFooter(null )
        )
      );
  }
});

module.exports = NotFoundPage;