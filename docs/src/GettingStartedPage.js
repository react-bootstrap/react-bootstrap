/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var TabbedArea = require('../../cjs/TabbedArea');
var TabPane = require('../../cjs/TabPane');

var Page = React.createClass({
  render: function () {
    var preStyles = {"overflow": true};
    return (
        <div>
          <NavMain activePage="getting-started" />

          <PageHeader
            title="Getting started"
            subTitle="React-Bootstrap overview, installation and usage."/>

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <div className="bs-docs-section">
                  <h2 id="overview" className="page-header">What and Why</h2>
                  <p className="lead">
                    React-Bootstrap is a library of front-end components drawn from Twitter Bootstrap, for use in React.js applications.  You get the responsive layout and consistency of a Bootstrap page, but with code that is much easier to read, maintain and extend.
                  </p>
                  <p>Here is how you create a simple tabbed-navigation area with React-Bootstrap, with the Bootstrap-only code given for comparison:</p>
                  <TabbedArea defaultActiveKey={2}>
                   <TabPane key={1} tab="With Bootstrap">               
                       <pre style={preStyles}>
                         {fs.readFileSync(__dirname + '/../comparisons/TabbedAreaBS.html', 'utf8')} 
                       </pre>
                   </TabPane>
                   <TabPane key={2} tab="With React-Bootstrap">
                      <pre style={preStyles}>{fs.readFileSync(__dirname + '/../examples/TabbedAreaUncontrolled.js', 'utf8')}</pre>
                   </TabPane>
                  </TabbedArea>
                  <h2 id="setup" className="page-header">Setup</h2>
                  <p className="lead">You can import the lib with as AMD modules, CommonJS modules as a global JS script.</p>

                  <p>First add the bootstrap CSS to your project then:</p>

                  <h3>CommonJS</h3>
                  <div className="highlight">
                    <pre><code className="shell">{'\
  $ npm install react@v0.10.0\n\
  $ npm install react-bootstrap\n\
                    '}</code></pre>
                    <pre><code className="js">{'\
  var Alert = require(\'react-bootstrap/Alert\');\n\
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
  var Alert = require(\'react-bootstrap/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap\').Alert;\
                    '}</code></pre>
                  </div>

                  <h3>Browser globals</h3>
                  <p>The bower repo contains <code>react-bootstrap.js</code> and <code>react-botstrap.min.js</code> with all components exported in the <code>window.ReactBootstrap</code> object.</p>
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
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>\n\
    <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>\n\
    <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>\n\
  <![endif]-->\
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
