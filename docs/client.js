'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./src/Routes');

// For React devtools
window.React = React;

Router.run(routes, Router.RefreshLocation, function (Handler) {
  React.render(
    React.createElement(Handler, window.INITIAL_PROPS), document);
})


