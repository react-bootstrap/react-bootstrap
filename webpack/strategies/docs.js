import _ from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default (config, options) => {
  if (options.docs) {
    let jsLoader = '';
    let cssSourceMap = options.development ? '?sourceMap' : '';

    config = _.extend({}, config, {
      entry: {
        bundle: './docs/client.js'
      },
      output: {
        filename: '[name].js',
        path: './docs-built/assets',
        publicPath: '/assets/'
      },
      externals: undefined,
      resolve: {
        extensions: ['', '.js', '.json']
      },
      module: {
        loaders: config.module.loaders
          .map(value => {
            if (/\.js\/$/.test(value.test.toString())) {
              jsLoader = value.loader;

              return _.extend({}, value, {
                loader: jsLoader + '!client',
                exclude: /node_modules|Samples\.js/
              });
            }

            return value;
          })
          .concat([
            { test: /Samples.js/, loader: 'transform?brfs!' + jsLoader },
            { test: /\.css/, loader: ExtractTextPlugin.extract('style', `css${cssSourceMap}`) },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style', `css${cssSourceMap}!less${cssSourceMap}`) },
            { test: /\.json$/, loader: 'json' },

            { test: /\.jpe?g$|\.gif$|\.png$/, loader: 'file?name=[name].[ext]' },
            { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/, loader: 'file?name=[name].[ext]' }
          ])
      },
      plugins: config.plugins.concat([
        new ExtractTextPlugin('[name].css')
      ])
    });

    return config;
  }

  return config;
};
