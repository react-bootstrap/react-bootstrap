import _ from 'lodash';

export default (config, options) => {
  if (options.development && !options.docs) {
    config = _.extend({}, config, {
      devtool: 'sourcemap'
    });

    return config;
  }

  return config;
};
