import _ from 'lodash';
import webpack from 'webpack';
import strategies from './strategies';
import yargs from 'yargs';

const argv = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .argv;

const defaultOptions = {
  development: argv.debug,
  docs: false,
  test: false,
  optimize: argv.optimizeMinimize
};

export default (options) => {
  options = _.merge({}, defaultOptions, options);
  const environment = options.development ? 'development' : 'production';

  const config = {
    entry: {
      'react-bootstrap': './src/index.js'
    },

    output: {
      path: './dist',
      filename: '[name].js',
      library: 'ReactBootstrap',
      libraryTarget: 'umd'
    },

    externals: [
      {
        'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        }
      }
    ],

    module: {
      loaders: [
        { test: /\.js/, loader: 'babel?optional=es7.objectRestSpread', exclude: /node_modules/ }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(environment)
        }
      })
    ]
  };

  return strategies.reduce((conf, strategy) => {
    return strategy(conf, options);
  }, config);
}
