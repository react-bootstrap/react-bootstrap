import { extend } from 'lodash';

export default (config, options) => {
  if (options.test) {
    config = extend({}, config, {
      devtool: 'inline-source-map',
      entry: undefined,
      output: {
        pathinfo: true
      },
      externals: undefined
    });
  }

  return config;
};
