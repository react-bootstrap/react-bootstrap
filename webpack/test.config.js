import _ from 'lodash-compat';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
  output: {
    pathinfo: true
  },

  devtool: 'eval'
});
