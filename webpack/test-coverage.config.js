import _ from 'lodash';
import { jsLoader } from './base.config';
import testConfig from './test.config';

export default _.extend({}, testConfig, {
  module: {
    loaders: [
      { test: /\.js/, loader: `${jsLoader}!isparta`, exclude: /node_modules|test[\/\\]/ },
      { test: /\.js/, loader: jsLoader, include: /test[\/\\]/ }
    ]
  }
});
