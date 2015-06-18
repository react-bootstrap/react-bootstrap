import _ from 'lodash';
import baseConfig, { jsLoader } from './base.config';

export default _.extend({}, baseConfig, {
  output: {
    pathinfo: true
  },

  module: {
    loaders: [
      { test: /\.js/, loader: `${jsLoader}!isparta`, exclude: /node_modules|test[\/\\]/ },
      { test: /\.js/, loader: jsLoader, include: /test[\/\\]/ }
    ]
  },

  devtool: 'eval'
});
