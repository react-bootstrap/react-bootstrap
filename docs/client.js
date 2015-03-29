import from 'bootstrap/less/bootstrap.less';
import from './assets/docs.css';
import from './assets/style.css';

import from './assets/carousel.png';
import from './assets/logo.png';

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
