'use strict';

var React = require('react');
var Router = require('react-router-component');

var HomePage = React.createFactory(require('./HomePage'));
var GettingStartedPage = React.createFactory(require('./GettingStartedPage'));
var ComponentsPage = React.createFactory(require('./ComponentsPage'));
var NotFoundPage = React.createFactory(require('./NotFoundPage'));

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var PagesHolder = React.createClass({
  render: function () {
    return (
        <Locations contextual>
          <Location path="/" handler={HomePage} />
          <Location path="/index.html" handler={HomePage} />
          <Location path="/getting-started.html" handler={GettingStartedPage} />
          <Location path="/components.html" handler={ComponentsPage} />
          <NotFound handler={NotFoundPage} />
        </Locations>
      );
  }
});

var Root = React.createClass({
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
        'components.html'
      ];
    },

    renderToString: function (props) {
      return Root.getDoctype() +
        React.renderToString(<Root {...props} />);
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
      __html:
        "window.INITIAL_PROPS = " + JSON.stringify(this.props) + ";\n" +
        // console noop shim for IE8/9
        "(function (w) {\n" +
        "  var noop = function () {};\n" +
        "  if (!w.console) {\n" +
        "    w.console = {};\n" +
        "    ['log', 'info', 'warn', 'error'].forEach(function (method) {\n" +
        "      w.console[method] = noop;\n" +
        "    });\n" +
        " }\n" +
        "}(window));\n"
    };

    var head = {
      __html: '<title>React Bootstrap</title>' +
        '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
        '<link href="vendor/bootstrap/bootstrap.css" rel="stylesheet" />' +
        '<link href="vendor/bootstrap/docs.css" rel="stylesheet" />' +
        '<link href="vendor/codemirror/codemirror.css" rel="stylesheet" />' +
        '<link href="vendor/codemirror/solarized.css" rel="stylesheet" />' +
        '<link href="vendor/codemirror/syntax.css" rel="stylesheet" />' +
        '<link href="assets/style.css" rel="stylesheet" />' +
        '<!--[if lt IE 9]>' +
        '<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>' +
        '<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>' +
        '<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>' +
        '<script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>' +
        '<script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>' +
        '<![endif]-->'
    };

    return (
        <html>
          <head dangerouslySetInnerHTML={head} />

          <body>
            <Locations path={Root.getBaseUrl() + this.props.initialPath}>
              <Location path={Root.getBaseUrl() + '*'} handler={React.createFactory(PagesHolder)} />
            </Locations>

            <script dangerouslySetInnerHTML={browserInitScriptObj} />
            <script src="vendor/codemirror/codemirror.js" />
            <script src="vendor/codemirror/javascript.js" />
            <script src="vendor/JSXTransformer.js" />
            <script src="assets/bundle.js" />
          </body>
        </html>
      );
  }
});

module.exports = Root;
