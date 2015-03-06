import React from 'react';
import express from 'express';
import path from 'path';
import url from 'url';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfigBuilder from '../webpack/webpack.config';
import Router from 'react-router';
import routes from './src/Routes';

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {
  let webpackConfig = webpackConfigBuilder({
    development: development,
    docs: true
  });
  let publicPath = webpackConfig.output.publicPath;

  webpackConfig.output.path = '/';
  webpackConfig.output.publicPath = undefined;

  app = app
    .use(webpackMiddleware(webpack(webpackConfig), {
      noInfo: false,
      publicPath: publicPath,
      stats: {
          colors: true
      }
    }))
    .use(function renderApp(req, res) {
      Router.run(routes, req.url, Handler => {
        let html = React.renderToString(<Handler />);
        res.send(html);
      });
    });
} else {
  app = app
    .use(express.static(path.join(__dirname, '../docs-built')));
}

app
  .listen(4000, function () {
    console.log('Server started at http://localhost:4000');
  });
