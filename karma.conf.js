const { DefinePlugin, ProvidePlugin } = require('webpack');

module.exports = (config) => {
  const { env } = process;

  config.set({
    frameworks: ['mocha', 'webpack', 'sinon-chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.[tj]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                envName: 'test',
              },
            },
          },
        ],
      },
      resolve: {
        symlinks: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        fallback: {
          util: require.resolve('util/'),
          // for Enzyme/Cheerio
          stream: require.resolve('stream-browserify'),
        },
      },
      plugins: [
        new DefinePlugin({
          __DEV__: true,
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
        new ProvidePlugin({
          process: 'process/browser',
        }),
      ],
      devtool: 'inline-cheap-module-source-map',
      stats: 'minimal',
    },

    reporters: ['mocha', 'coverage'],

    mochaReporter: {
      output: 'autowatch',
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],

    singleRun: env.CONTINUOUS_INTEGRATION === 'true',
  });
};
