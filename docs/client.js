import 'bootstrap/less/bootstrap.less';
import './assets/docs.css';
import './assets/style.css';

import './assets/carousel.png';
import './assets/logo.png';

import React from 'react';
import Router from 'react-router';
import routes from './src/Routes';

// TODO: Move this to Webpack
// For React devtools
window.React = React;

Router.run(routes, Router.RefreshLocation, Handler => {
  React.render(
    React.createElement(Handler, window.INITIAL_PROPS), document);
});
