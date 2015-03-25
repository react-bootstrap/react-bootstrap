import _ from 'lodash';

export default (config, options) => {
  if (options.optimize) {
    config = _.extend({}, config, {
      output: _.extend({}, config.output, {
        filename: '[name].min.js'
      })
    });

    return config;
  }

  return config;
}
