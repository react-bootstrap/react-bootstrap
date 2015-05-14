import { extend, mapValues } from 'lodash';
import webpack from 'webpack';

function addWebpackDevServerScripts(entries, webpackDevServerAddress) {
  let clientScript = `webpack-dev-server/client?${webpackDevServerAddress}`;
  let webpackScripts = ['webpack/hot/dev-server', clientScript];
  return mapValues(entries, entry => webpackScripts.concat(entry));
}

export default (config, options) => {
  if (options.development && options.docs) {
    let webpackDevServerAddress = `http://localhost:${options.port}`;
    config = extend({}, config, {
      entry: addWebpackDevServerScripts(config.entry, webpackDevServerAddress),
      output: extend({}, config.output, {
        publicPath: `${webpackDevServerAddress}/assets/`
      }),
      module: extend({}, config.module, {
        loaders: config.module.loaders.map(value => {
          if (/js/.test(value.test.toString())) {
            return extend({}, value, {
              loader: 'react-hot!' + value.loader
            });
          }
          else {
            return value;
          }
        })
      }),
      // Remove extract text plugin from dev workflow so hot reload works on css.
      plugins: config.plugins.concat([
        new webpack.NoErrorsPlugin()
      ])
    });
  }

  return config;
};
