/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var Page = React.createClass({
  render: function () {
    return (
        <div>
          <NavMain activePage="getting-started" />

          <PageHeader
            title="Getting started"
            subTitle="An overview of React-Bootstrap and how to install and use." />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <div className="bs-docs-section">
                  <h1 id="setup" className="page-header">Setup</h1>
                  <p className="lead">You can import the lib with as AMD modules, CommonJS modules as a global JS script.</p>

                  <p>First add the bootstrap CSS to your project then:</p>

                  <h3>AMD</h3>
                  <div className="highlight">
                    <pre><code className="js">{'\
  bower install react#v0.9.0\n\
  bower install react-bootstrap\n\
  \n\
  var Alert = require(\'react-bootstrap/amd/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap/amd\').Alert;\
                    '}</code></pre>
                  </div>

                  <h3>CommonJS</h3>
                  <div className="highlight">
                    <pre><code className="js">{'\
  npm install react@v0.9.0\n\
  npm install react-bootstrap\n\
  \n\
  var Alert = require(\'react-bootstrap/cjs/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap\').Alert;\
                    '}</code></pre>
                  </div>

                  <h3>Browser globals</h3>
                  <div className="highlight">
                    <pre><code className="js">{'\
  <script src="http://fb.me/react-0.9.0.js"></script>\n\
  <script src="react-bootstrap/dist/react-bootstrap.min.js"></script>\n\
  <script>\n\
    var Alert = ReactBootstrap.Alert;\n\
  </script>\
                    '}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      );
  },

  shouldComponentUpdate: function() {
    return false;
  }
});

module.exports = Page;
