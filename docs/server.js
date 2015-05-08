import 'colors';
import React from 'react';
import express from 'express';
import path from 'path';
import Router from 'react-router';
import routes from './src/Routes';
import httpProxy from 'http-proxy';

const development = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;

let app = express();

if (development) {
  let proxy = httpProxy.createProxyServer();
  let webpackPort = process.env.WEBPACK_DEV_PORT;
  let target = `http://localhost:${webpackPort}`;

  app.get('/assets/*', function (req, res) {
    proxy.web(req, res, { target });
  });

  app.use(function renderApp(req, res) {
    Router.run(routes, req.url, Handler => {
      let html = React.renderToString(<Handler />);
      res.send(html);
    });
  });

  proxy.on('error', function(e) {
    console.log('Could not connect to webpack proxy'.red);
    console.log(e.toString().red);
  });
} else {
  app.use(express.static(path.join(__dirname, '../docs-built')));
}

app.listen(port, function () {
  console.log(`Server started at http://localhost:${port}`);
});
