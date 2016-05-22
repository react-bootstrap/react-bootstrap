import _ from 'lodash';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
  output: {
    pathinfo: true
  },

  devtool: 'eval'
});
