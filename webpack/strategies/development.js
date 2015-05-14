import { extend } from 'lodash';

export default (config, options) => {
  if (options.development && !options.docs) {
    config = extend({}, config, {
      devtool: 'sourcemap'
    });
  }

  return config;
};
