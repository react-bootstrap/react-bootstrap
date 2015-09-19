/* eslint no-console: 0 */

import 'colors';
import React from 'react';
import express from 'express';
import path from 'path';
import Router from 'react-router';
import routes from './src/Routes';
import httpProxy from 'http-proxy';

import metadata from './generate-metadata';
import ip from 'ip';

const development = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;

let app = express();

if (development) {
  let proxy = httpProxy.createProxyServer();
  let webpackPort = process.env.WEBPACK_DEV_PORT;
  let target = `http://${ip.address()}:${webpackPort}`;

  app.get('/assets/*', (req, res) => {
    proxy.web(req, res, { target });
  });

  proxy.on('error', e => {
    console.log('Could not connect to webpack proxy'.red);
    console.log(e.toString().red);
  });

  console.log('Prop data generation started:'.green);

  metadata().then( props => {
    console.log('Prop data generation finished:'.green);

    app.use(function renderApp(req, res) {
      res.header('Access-Control-Allow-Origin', target);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');

      Router.run(routes, req.url, Handler => {
        let html = React.renderToString(<Handler assetBaseUrl={target} propData={props}/>);
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
