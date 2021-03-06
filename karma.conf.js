const { DefinePlugin } = require('webpack');

module.exports = (config) => {
  const { env } = process;

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

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
        // for Enzyme/Cheerio
        fallback: { stream: require.resolve('stream-browserify') },
      },
      plugins: [
        new DefinePlugin({
          __DEV__: true,
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
      ],
      devtool: 'inline-cheap-module-source-map',
      stats: 'minimal',
    },

    webpackMiddleware: {
      noInfo: true,
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
