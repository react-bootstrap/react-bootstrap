/** @jsx React.DOM */

'use strict';

var React = require('react');
var Router = require('react-router-component');

var HomePage = require('./HomePage');
var GettingStartedPage = require('./GettingStartedPage');
var CSSPage = require('./CSSPage');
var ComponentsPage = require('./ComponentsPage');
var JavaScriptPage = require('./JavaScriptPage');
var NotFoundPage = require('./NotFoundPage');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var PagesHolder = React.createClass({displayName: 'PagesHolder',
  render: function () {
    return (
        Locations( {contextual:true},
          Location( {path:"/", handler:HomePage} ),
          Location( {path:"/index.html", handler:HomePage} ),
          Location( {path:"/getting-started.html", handler:GettingStartedPage} ),
          Location( {path:"/css.html", handler:CSSPage} ),
          Location( {path:"/components.html", handler:ComponentsPage} ),
          Location( {path:"/javascript.html", handler:JavaScriptPage} ),
          NotFound( {handler:NotFoundPage} )
        )
      );
  }
});

var Root = React.createClass({displayName: 'Root',
  statics: {

    /**
     * Get the doctype the page expects to be rendered with
     *
     * @returns {string}
     */
    getDoctype: function () {
      return '<!doctype html>';
    },

    /**
     * Get the list of pages that are renderable
     *
     * @returns {Array}
     */
    getPages: function () {
      return [
        'index.html',
        'getting-started.html',
        'css.html',
        'components.html',
        'javascript.html'
      ];
    },

    /**
     * Get the Base url this app sits at
     * This url is appended to all app urls to make absolute url's within the app.
     *
     * @returns {string}
     */
    getBaseUrl: function () {
      return '/';
    }
  },

  render: function () {
    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    var browserInitScriptObj = {
      __html: 'window.INITIAL_PROPS = ' + JSON.stringify(this.props) + ';'
    };

    return (
        React.DOM.html(null,
          React.DOM.head(null,
            React.DOM.title(null, "React Bootstrap"),
            React.DOM.meta( {name:"viewport", content:"width=device-width, initial-scale=1.0"} ),

            React.DOM.link( {href:"vendor/bootstrap/bootstrap.css", rel:"stylesheet"} ),
            React.DOM.link( {href:"vendor/bootstrap/docs.css", rel:"stylesheet"} ),
            React.DOM.link( {href:"vendor/codemirror/codemirror.css", rel:"stylesheet"} ),
            React.DOM.link( {href:"vendor/codemirror/solarized.css", rel:"stylesheet"} ),
            React.DOM.link( {href:"vendor/codemirror/syntax.css", rel:"stylesheet"} ),
            React.DOM.link( {href:"assets/style.css", rel:"stylesheet"} )
          ),

          React.DOM.body(null,
            Locations( {path:Root.getBaseUrl() + this.props.initialPath},
              Location( {path:Root.getBaseUrl() + '*', handler:PagesHolder} )
            ),

            React.DOM.script( {dangerouslySetInnerHTML:browserInitScriptObj} ),
            React.DOM.script( {src:"vendor/codemirror/codemirror.js"} ),
            React.DOM.script( {src:"vendor/codemirror/javascript.js"} ),
            React.DOM.script( {src:"vendor/JSXTransformer.js"} ),
            React.DOM.script( {src:"bundle.js"} )
          )
        )
      );
  }
});

module.exports = Root;