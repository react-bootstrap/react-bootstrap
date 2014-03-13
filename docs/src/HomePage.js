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

          <main className="bs-docs-masthead" id="content" role="main">
            <div className="container">
              <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
              <p className="lead">The most popular front-end framework, rebuilt for React.</p>
            </div>
          </main>

          <PageFooter />
        </div>
      );
  }
});

module.exports = HomePage;