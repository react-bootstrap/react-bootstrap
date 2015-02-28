'use strict';

var fs = require('fs');
var path = require('path');

require('node-jsx').install();

var React = require('react');
var routes = require('./src/Routes');
var Router = require('react-router');

var Root = require('./src/Root');

Root.getPages()
  .forEach(function (fileName) {

    Router.run(routes, '/' + fileName, function (Handler) {
      var RootHTML = React.renderToString(React.createElement(Handler));

      fs.writeFileSync(
        path.join(__dirname, fileName), RootHTML);
    })
  });