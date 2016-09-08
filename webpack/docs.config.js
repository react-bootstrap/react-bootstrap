import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ip from 'ip';
import webpack from 'webpack';

import baseConfig, { options, jsLoader } from './base.config';

const webpackDevServerAddress = `http://${ip.address()}:${options.port}`;
const cssSourceMap = options.debug ? '?sourceMap' : '';
const reactHot = options.debug ? 'react-hot!' : '';

const entryFile = './docs/client.js';
const devEntryBundle = [
  'webpack/hot/dev-server',
  `webpack-dev-server/client?${webpackDevServerAddress}`,
  entryFile,
];

baseConfig.plugins.push(new ExtractTextPlugin('[name].css'));
if (options.debug) {
  baseConfig.plugins.push(new webpack.NoErrorsPlugin());
}

export default {
  ...baseConfig,

  devtool: options.debug ? 'source-map' : null,

  entry: {
    bundle: options.debug ? devEntryBundle : entryFile,
  },

  output: {
    filename: '[name].js',
    path: './docs-built/assets',
    publicPath: options.debug ? `${webpackDevServerAddress}/assets/` : '/assets/',
  },

  module: {
    loaders: [
      { test: /\.js/, loader: `${reactHot}${jsLoader}`, exclude: /node_modules|Samples\.js/ },
      { test: /Samples.js/, loader: `${reactHot}transform?brfs!${jsLoader}` },
      { test: /\.css/,
        loader: ExtractTextPlugin.extract('style', `css${cssSourceMap}`) },
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', `css${cssSourceMap}!less${cssSourceMap}`) },
      { test: /\.json$/, loader: 'json' },
      { test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file?name=[name].[ext]' },
      { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' },
    ],
  },
};
