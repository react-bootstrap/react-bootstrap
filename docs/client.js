import 'bootstrap/less/bootstrap.less';
import './assets/docs.css';
import './assets/style.css';

import './assets/carousel.png';
import './assets/logo.png';
import './assets/favicon.ico';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/solarized.css';
import 'codemirror/lib/codemirror.css';
import './assets/CodeMirror.css';

import React from 'react';
import CodeMirror from 'codemirror';
import Router from 'react-router';
import routes from './src/Routes';

global.CodeMirror = CodeMirror;

Router.run(routes, Router.RefreshLocation, Handler => {
  React.render(
    React.createElement(Handler, window.INITIAL_PROPS), document);
});
