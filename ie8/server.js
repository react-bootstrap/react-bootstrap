import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfigBuilder from '../webpack/webpack.config';

const development = process.env.NODE_ENV !== 'production';
let app = express();

if (development) {
  let webpackConfig = webpackConfigBuilder({
    development: development,
    ie8: true
  });
  let publicPath = webpackConfig.output.publicPath;

  webpackConfig.output.path = '/';
  webpackConfig.output.publicPath = undefined;

  console.log('webpackConfig');
  console.log(webpackConfig);

  app = app
    .use(webpackMiddleware(webpack(webpackConfig), {
      noInfo: false,
      publicPath: publicPath,
      stats: {
          colors: true
      }
    }))
    .use(express.static(path.join(__dirname)));
} else {
  app = app
    .use(express.static(path.join(__dirname, '../ie8-built')));
}

app
  .listen(4000, function () {
    console.log('Server started at http://localhost:4000');
  });
