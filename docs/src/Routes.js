var React = require('react');

var Root = require('./Root');
var HomePage = require('./HomePage');
var GettingStartedPage = require('./GettingStartedPage');
var ComponentsPage = require('./ComponentsPage');
var NotFoundPage = require('./NotFoundPage');

var Router = require('react-router');


module.exports = (
  <Router.Route name="app" path="/" handler={Root}>
    <Router.DefaultRoute handler={HomePage}/>
    <Router.NotFoundRoute handler={NotFoundPage} />

    <Router.Route name='home' path="index.html" handler={HomePage} />
    <Router.Route name='getting-started' path="getting-started.html" handler={GettingStartedPage} />
    <Router.Route name='components' path="components.html" handler={ComponentsPage} />  
  </Router.Route>
)
