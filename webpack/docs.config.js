import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ip from 'ip';
import webpack from 'webpack';
import path from 'path';

import baseConfig, { options, jsLoader } from './base.config';

const webpackDevServerAddress = `http://${ip.address()}:${options.port}`;
const cssSourceMap = options.debug ? '?sourceMap' : '';

const entryFile = path.resolve('./docs/client.js');
const devEntryBundle = [
  'react-hot-loader/patch',
  entryFile,
];

baseConfig.plugins.push(new ExtractTextPlugin({filename: '[name].css'}));
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const jsLoaders = [jsLoader];
const sampleLoaders = [{ loader: 'transform-loader', options: {brfs: true} }, jsLoader];

if (options.debug) {
  baseConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

export default {
  ...baseConfig,

  devtool: options.debug ? 'source-map' : false,

  entry: {
    bundle: options.debug ? devEntryBundle : entryFile,
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./docs-built/assets'),
    publicPath: options.debug ? `${webpackDevServerAddress}/assets/` : '/assets/',
  },

  module: {
    rules: [
      { test: /\.js/, use: jsLoaders, exclude: /node_modules|Samples\.js/ },
      { test: /Samples.js/, use: sampleLoaders },
      { test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: `css-loader${cssSourceMap}`
        })
      },
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: `css-loader${cssSourceMap}!less-loader${cssSourceMap}`
        })
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jpe?g$|\.gif$|\.png|\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
};
