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
                  <h2 id="setup" className="page-header">Setup</h2>
                  <p className="lead">You can import the lib as AMD modules, CommonJS modules, or as a global JS script.</p>

                  <p>First add the Bootstrap CSS to your project; check <a href="http://getbootstrap.com/getting-started/" name="Bootstrap Docs">here</a> if you have not already done that. Then:</p>

                  <h3>CommonJS</h3>
                  <div className="highlight">
                    <pre><code className="shell">{'\
  $ npm install react@v0.10.0\n\
  $ npm install react-bootstrap\n\
                    '}</code></pre>
                    <pre><code className="js">{'\
  var Alert = require(\'react-bootstrap/lib/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap\').Alert;\
                    '}</code></pre>
                  </div>

                  <h3>AMD</h3>
                  <div className="highlight">
                    <pre><code className="shell">{'\
  $ bower install react#v0.10.0\n\
  $ bower install react-bootstrap\n\
                    '}</code></pre>
                    <pre><code className="js">{'\
  var Alert = require(\'react-bootstrap/lib/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap\').Alert;\
                    '}</code></pre>
                  </div>

                  <h3>Browser globals</h3>
                  <p>The bower repo contains <code>react-bootstrap.js</code> and <code>react-bootstrap.min.js</code> with all components exported in the <code>window.ReactBootstrap</code> object.</p>
                  <div className="highlight">
                    <pre><code className="html">{'\
  <script src="http://fb.me/react-0.10.0.js"></script>\n\
  <script src="path/to/react-bootstrap-bower/react-bootstrap.min.js"></script>\n\
  <script>\n\
    var Alert = ReactBootstrap.Alert;\n\
  </script>\
                    '}</code></pre>
                  </div>
                </div>
                <div className="bs-docs-section">
                  <h2 id="browser-support" className="page-header">Browser support</h2>
                  <p>We aim to support all browsers supported by both <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">React</a> and <a href="http://getbootstrap.com/getting-started/#support">Bootstrap</a>.</p>

                  <p>React requires <a href="http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills">polyfills for non-ES5 capable browsers.</a></p>

                  <p><a href="http://jquery.com">jQuery</a> is currently required only for IE8 support for components which require reading element positions from the DOM: <code>Popover</code> and <code>Tooltip</code> when launched with <code>OverlayTrigger</code>. We would like to remove this dependency in future versions but for now, including the following snippet in your page should have you covered:</p>

                  <div className="highlight">
                    <pre><code className="html">{'\
  <!--[if lt IE 9]>\n\
    <script>\n\
      (function(){\n\
        var ef = function(){};\n\
        window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};\n\
      }());\n\
    </script>\n\
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>\n\
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>\n\
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\n\
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>\n\
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>\n\
  <![endif]-->\n\
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
