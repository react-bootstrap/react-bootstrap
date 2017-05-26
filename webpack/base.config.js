import webpack from 'webpack';
import yargs from 'yargs';

export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export const jsLoader = {
  loader: 'babel-loader',
  options: { cacheDirectory: true }
};

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  module: {
    rules: [
      { test: /\.js/, use: [jsLoader], exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ],
  devtool: options.optimizeMinimize ? 'source-map' : false
};

export default baseConfig;
