/** @jsx React.DOM */

'use strict';

var React = require('react');
var Router = require('react-router');

var HomePage = require('./HomePage');
var GettingStartedPage = require('./GettingStartedPage');
var ComponentsPage = require('./ComponentsPage');
var NotFoundPage = require('./NotFoundPage');

var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Root = React.createClass({
  statics: {

    /**
     * Get the list of pages that are renderable
     *
     * @returns {Array}
     */
    getPages: function () {
      return {
        home: 'index.html',
        gettingStarted: 'getting-started.html',
        components: 'components.html'
      };
    },

    renderToString: function (props) {
      return Router.renderRoutesToString(this.routes, props.initialPath);
    },

    routes: function () {
      return (
        <Routes location="history">
          <Route path="/" name="home" handler={HomePage} />
          <Route path="/index.html" handler={HomePage} />
          <Route path="/getting-started.html" name="gettingStarted" handler={GettingStartedPage} />
          <Route path="/components.html" name="components" handler={ComponentsPage} />
          <DefaultRoute handler={NotFoundPage} />
        </Routes>
      );
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
  }
});

module.exports = Root;