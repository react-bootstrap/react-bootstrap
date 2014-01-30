/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

var NotFoundPage = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="" />

          <PageHeader
            title="404"
            subTitle="Hmmm this is awkward." />

          <PageFooter />
        </div>
      );
  }
});

module.exports = NotFoundPage;