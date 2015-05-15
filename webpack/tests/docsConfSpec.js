import path from 'path';
const root = path.join(__dirname, '../../');

export default {
  configFile: 'webpack.docs.js',
  tests: [

    // npm run docs
    {
      args: 'd',
      expected: {
        entry:
         { bundle:
            [ 'webpack/hot/dev-server',
              'webpack-dev-server/client?http://localhost:8080',
              './docs/client.js' ] },
        output:
         { filename: '[name].js',
           path: './docs-built/assets',
           publicPath: 'http://localhost:8080/assets/' },
        externals: undefined,
        module:
         { noParse: /babel-core\/browser/,
           loaders:
            [ { test: /\.js/,
                loader: 'react-hot!babel',
                exclude: /node_modules|Samples\.js/ },
              { test: /Samples.js/, loader: 'react-hot!transform?brfs!babel' },
              { test: /\.css/,
                loader: `${root}node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css?sourceMap` },
              { test: /\.less$/,
                loader: `${root}node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css?sourceMap!less?sourceMap` },
              { test: /\.json$/, loader: 'json' },
              { test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
                loader: 'file?name=[name].[ext]' },
              { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/,
                loader: 'file?name=[name].[ext]' } ] },
        plugins:
         [ { definitions: { 'process.env': { NODE_ENV: '"development"' } } },
           { filename: '[name].css', options: {}, id: 1 },
           {} ]
      }
    },

    // npm run build
    // npm run docs-build
    // npm run docs-prod
    {
      args: 'p',
      expected: {
        entry: { bundle: './docs/client.js' },
        output:
         { filename: '[name].js',
           path: './docs-built/assets',
           publicPath: '/assets/' },
        externals: undefined,
        module:
         { noParse: /babel-core\/browser/,
           loaders:
            [ { test: /\.js/,
                loader: 'babel',
                exclude: /node_modules|Samples\.js/ },
              { test: /Samples.js/, loader: 'transform?brfs!babel' },
              { test: /\.css/,
                loader: `${root}node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css` },
              { test: /\.less$/,
                loader: `${root}node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css!less` },
              { test: /\.json$/, loader: 'json' },
              { test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
                loader: 'file?name=[name].[ext]' },
              { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/,
                loader: 'file?name=[name].[ext]' } ] },
        plugins:
         [ { definitions: { 'process.env': { NODE_ENV: '"production"' } } },
           { filename: '[name].css', options: {}, id: 1 } ],
        devtool: 'source-map'
      }
    },

    // for extra testing
    {
      args: '',
      expected: {
        entry: { bundle: './docs/client.js' },
        output:
         { filename: '[name].js',
           path: './docs-built/assets',
           publicPath: '/assets/' },
        externals: undefined,
        module:
         { noParse: /babel-core\/browser/,
           loaders:
            [ { test: /\.js/,
                loader: 'babel',
                exclude: /node_modules|Samples\.js/ },
              { test: /Samples.js/, loader: 'transform?brfs!babel' },
              { test: /\.css/,
                loader: `${root}node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css` },
              { test: /\.less$/,
                loader: `${root}node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"extract":true,"remove":true}!style!css!less` },
              { test: /\.json$/, loader: 'json' },
              { test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
                loader: 'file?name=[name].[ext]' },
              { test: /\.eot$|\.ttf$|\.svg$|\.woff2?$/,
                loader: 'file?name=[name].[ext]' } ] },
        plugins:
         [ { definitions: { 'process.env': { NODE_ENV: '"development"' } } },
           { filename: '[name].css', options: {}, id: 1 } ]
      }
    }
  ]
};
