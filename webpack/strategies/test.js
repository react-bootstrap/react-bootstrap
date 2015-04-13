import _ from 'lodash';

export default (config, options) => {
  if (options.test) {
    config = _.extend({}, config, {
      devtool: 'inline-source-map',
      entry: undefined,
      output: {
        pathinfo: true
      },
      externals: undefined
    });

    return config;
  }

  return config;
};
