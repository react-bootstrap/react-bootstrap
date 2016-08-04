require('babel-register');

const webpack = require('webpack');

const webpackConfigBase = require('./webpack/base.config').default;

module.exports = config => {
  const { env } = process;

  const coverageReporters = env.CONTINUOUS_INTEGRATION === 'true' ?
    ['coverage', 'coveralls'] : ['coverage'];

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    // This explicitly doesn't use webpack-merge because we want to override
    // the DefinePlugin in the base config.
    webpack: Object.assign({}, webpackConfigBase, {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
        }),
      ],
      devtool: 'cheap-module-inline-source-map',
    }),

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['mocha', ...coverageReporters],

    mochaReporter: {
      output: 'autowatch',
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],

    singleRun: env.CONTINUOUS_INTEGRATION === 'true',
  });
};
