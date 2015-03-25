import _ from 'lodash';

export default (config, options) => {
  if (options.ie8) {
    config = _.extend({}, config, {
      entry: {
        bundle: './ie8/src.js'
      },
      output: {
        filename: '[name].js',
        path: './ie8-built/assets',
        publicPath: '/assets/'
      },
      externals: undefined,
      module: {
        loaders: config.module.loaders.concat([
          { test: /\.jpe?g$|\.gif$|\.png$/, loader: 'file?name=[name].[ext]' }
        ])
      }
    });

    return config;
  }

  return config;
}
