import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import yargs from 'yargs';

const babelCache = path.resolve(path.join(__dirname, '../.babel-cache'));

if (!fs.existsSync(babelCache)) {
  try {
    fs.mkdirSync(babelCache);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(err.stack);
    }
  }
}

export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export const jsLoader = `babel?cacheDirectory=${babelCache}`;

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;
