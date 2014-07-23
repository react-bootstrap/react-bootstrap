/** @jsx React.DOM */

'use strict';

var React = require('react');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');

var Button = require('../../cjs/Button');
var ButtonToolbar = require('../../cjs/ButtonToolbar');

var HomePage = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="home" />

          <main className="bs-docs-masthead" id="content" role="main">
            <div className="container">
              <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
              <p className="lead">The most popular front-end framework, rebuilt for React.</p>
              <ButtonToolbar bsSize="medium">
                <Button bsStyle="primary" href="/getting-started.html">Get Started</Button>
                <Button bsStyle="primary" href="http://github.com/react-bootstrap/">Github</Button>
                <Button bsStyle="primary" href="/introduction.html">What is this?</Button>
              </ButtonToolbar>
            </div>
          </main>

          <PageFooter />
        </div>
      );
  }
});

module.exports = HomePage;