/** @jsx React.DOM */

'use strict';

var React = require('react');
var fs = require('fs');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var Page = React.createClass({displayName: 'Page',
  render: function () {
    return (
        React.DOM.div(null,
          NavMain( {activePage:"getting-started"} ),

          PageHeader(
            {title:"Getting started",
            subTitle:"An overview of React-Bootstrap and how to install and use."} ),

          React.DOM.div( {className:"container bs-docs-container"},
            React.DOM.div( {className:"row"},
              React.DOM.div( {className:"col-md-9", role:"main"},
                React.DOM.div( {className:"bs-docs-section"},
                  React.DOM.h1( {id:"setup", className:"page-header"}, "Setup"),
                  React.DOM.p( {className:"lead"}, "You can import the lib with as AMD modules, CommonJS modules as a global JS script."),

                  React.DOM.p(null, "First add the bootstrap CSS to your project then:"),

                  React.DOM.h3(null, "AMD"),
                  React.DOM.div( {className:"highlight"},
                    React.DOM.pre(null, React.DOM.code( {className:"js"}, '\
  bower install react#v0.9.0\n\
  bower install react-bootstrap\n\
  \n\
  var Alert = require(\'react-bootstrap/amd/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap/amd\').Alert;\
                    '))
                  ),

                  React.DOM.h3(null, "CommonJS"),
                  React.DOM.div( {className:"highlight"},
                    React.DOM.pre(null, React.DOM.code( {className:"js"}, '\
  npm install react@v0.9.0\n\
  npm install react-bootstrap\n\
  \n\
  var Alert = require(\'react-bootstrap/cjs/Alert\');\n\
  // or\n\
  var Alert = require(\'react-bootstrap\').Alert;\
                    '))
                  ),

                  React.DOM.h3(null, "Browser globals"),
                  React.DOM.div( {className:"highlight"},
                    React.DOM.pre(null, React.DOM.code( {className:"js"}, '\
  <script src="http://fb.me/react-0.9.0.js"></script>\n\
  <script src="react-bootstrap/dist/react-bootstrap.min.js"></script>\n\
  <script>\n\
    var Alert = ReactBootstrap.Alert;\n\
  </script>\
                    '))
                  )
                )
              )
            )
          ),

          PageFooter(null )
        )
      );
  },

  shouldComponentUpdate: function() {
    return false;
  }
});

module.exports = Page;
