import 'bootstrap/less/bootstrap.less';
import './assets/docs.css';
import './assets/style.css';

import './assets/carousel.png';
import './assets/logo.png';
import './assets/favicon.ico';
import './assets/thumbnail.png';
import './assets/thumbnaildiv.png';
import './assets/TheresaKnott_castle.svg';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/solarized.css';
import 'codemirror/lib/codemirror.css';
import './assets/CodeMirror.css';

import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import Router from 'react-router';
import routes from './src/Routes';

global.CodeMirror = CodeMirror;

Router.run(routes, Router.RefreshLocation, Handler => {
  React.render(
    React.createElement(Handler, window.INITIAL_PROPS), document);
});
