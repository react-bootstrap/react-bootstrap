import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/jsx/jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

import Root from './src/Root';
import routes from './src/Routes';

import 'bootstrap/less/bootstrap.less';

import './assets/docs.css';
import './assets/style.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import './assets/CodeMirror.css';

import './assets/carousel.png';
import './assets/logo.png';
import './assets/favicon.ico';
import './assets/thumbnail.png';
import './assets/thumbnaildiv.png';
import './assets/TheresaKnott_castle.svg';

global.CodeMirror = CodeMirror;

Root.assetBaseUrl = window.ASSET_BASE_URL;
Root.propData = window.PROP_DATA;

ReactDOM.render(
  <Router history={browserHistory} children={routes} />,
  document
);
