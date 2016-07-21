require('babel/register');

const path = require('path');
const merge = require('webpack-merge');

const webpackConfigBase = require('./webpack/base.config').default;

module.exports = config => {
  const { env } = process;

  const isCi = env.CONTINUOUS_INTEGRATION === 'true';
  const runCoverage = env.COVERAGE === 'true' || isCi;

  let webpackConfig = merge(webpackConfigBase, {
    output: {
      pathinfo: true
    },
    devtool: 'cheap-module-inline-source-map',
  });

  const coverageReporters = [];

  if (runCoverage) {
    // Correctly order isparta-loader v. babel-loader.
    webpackConfig = merge(
      {
        module: {
          loaders: [{
            test: /\.js/, include: path.resolve('src'), loader: 'isparta',
          }],
        },
      },
      webpackConfig
    );

    coverageReporters.push('coverage');

    if (isCi) {
      coverageReporters.push('coveralls');
    }
  }

  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

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

    singleRun: isCi,
  });
};
