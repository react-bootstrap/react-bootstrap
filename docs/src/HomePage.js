/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

var HomePage = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="home" />

          <PageHeader
            title="React bootstrap"
            subTitle="Bootstrap 3 components built with React" />

          <PageFooter />
        </div>
      );
  }
});

module.exports = HomePage;