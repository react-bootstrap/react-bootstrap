import _ from 'lodash';
import baseConfig, { options } from './base.config';

export default _.extend({}, baseConfig, {
  entry: {
    'react-bootstrap': './src/index.js'
  },

  output: {
    path: './dist',
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
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
  ]
});
