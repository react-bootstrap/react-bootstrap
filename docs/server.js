/* eslint no-console: 0 */

import 'colors';
import express from 'express';
import httpProxy from 'http-proxy';
import ip from 'ip';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

import Root from './src/Root';
import routes from './src/Routes';

import metadata from './generate-metadata';

const development = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;

const app = express();

if (development) {
  const proxy = httpProxy.createProxyServer();
  const webpackPort = process.env.WEBPACK_DEV_PORT;

  const target = `http://${ip.address()}:${webpackPort}`;
  Root.assetBaseUrl = target;

  app.get('/assets/*', (req, res) => {
    proxy.web(req, res, { target });
  });

  proxy.on('error', e => {
    console.log('Could not connect to webpack proxy'.red);
    console.log(e.toString().red);
  });

  console.log('Prop data generation started:'.green);

  metadata().then(props => {
    console.log('Prop data generation finished:'.green);
    Root.propData = props;

    app.use(function renderApp(req, res) {
      res.header('Access-Control-Allow-Origin', target);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');

      const location = req.url;
      match({routes, location}, (error, redirectLocation, renderProps) => {
        const html = ReactDOMServer.renderToString(
          <RoutingContext {...renderProps} />
        );
        res.send('<!doctype html>' + html);
      });
    });
  });
} else {
  app.use(express.static(path.join(__dirname, '../docs-built')));
}

app.listen(port, () => {
  console.log(`Server started at:`);
  console.log(`- http://localhost:${port}`);
  console.log(`- http://${ip.address()}:${port}`);
});
