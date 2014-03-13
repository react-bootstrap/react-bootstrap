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
          <NavMain activePage="javascript" />

          <PageHeader
            title="JavaScript"
            subTitle="Bring Bootstrap's components to life with over a dozen custom React components." />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">

                {/* Nav */}
                <div className="bs-docs-section">
                  <h1 id="navs" className="page-header">Navs <small>Nav, NavItem</small></h1>
                  <h2 id="navs-examples">Example navs</h2>

                  <p>Navs come in two styles, pills and tabs.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/NavBasic.js', 'utf8')} />
                </div>

                {/* Tabbed Areas */}
                <div className="bs-docs-section">
                  <h1 id="tabs" className="page-header">Togglable tabs <small>TabbedArea, TabPane</small></h1>
                  <h2 id="tabs-examples">Example tabs</h2>
                  <p>Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus.</p>

                  <h3>Uncontrolled</h3>
                  <p>Allow the component to control its own state.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TabbedAreaUncontrolled.js', 'utf8')} exampleClassName="bs-example-tabs" />

                  <h3>Controlled</h3>
                  <p>Pass down the active state on render via props.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/TabbedAreaControlled.js', 'utf8')} exampleClassName="bs-example-tabs" />

                  <div className="bs-callout bs-callout-info">
                    <h4>Extends tabbed navigation</h4>
                    <p>This plugin extends the <a href="#navs">tabbed navigation component</a> to add tabbable areas.</p>
                  </div>
                </div>

                {/* Alerts */}
                <div className="bs-docs-section">
                  <h1 id="alerts" className="page-header">Alert messages <small>Alert</small></h1>
                  <h2 id="alerts-examples">Example alerts</h2>

                  <p>Basic alert styles.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/AlertBasic.js', 'utf8')} />

                  <p>Closeable alerts, just pass in a <code>onDismiss</code> function.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/AlertDismissable.js', 'utf8')} />

                  <p>Auto close after a set time with <code>dismissAfter</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/AlertAutoDismissable.js', 'utf8')} />
                </div>
              </div>

              <div className="col-md-3">
                <div className="bs-docs-sidebar hidden-print affix-top" role="complementary">
                  <ul className="nav bs-docs-sidenav">
                    <li>
                      <a href="#navs">Navs</a>
                      <ul className="nav">
                        <li><a href="#navs-examples">Examples</a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="#tabs">Togglable Tabs</a>
                      <ul className="nav">
                        <li><a href="#tabs-examples">Examples</a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="#alerts">Alerts</a>
                      <ul className="nav">
                        <li><a href="#alerts-examples">Examples</a></li>
                      </ul>
                    </li>
                  </ul>
                  <a className="back-to-top" href="#top">
                  Back to top
                  </a>
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
