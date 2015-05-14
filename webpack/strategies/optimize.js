import { extend } from 'lodash';

export default (config, options) => {
  if (options.optimize) {
    config = extend({}, config, {
      output: extend({}, config.output, {
        filename: '[name].min.js'
      })
    });
  }

  return config;
};
