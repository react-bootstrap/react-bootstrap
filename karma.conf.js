/* eslint no-var: 0, babel/object-shorthand: 0, vars-on-top: 0, func-names: 0 */
require('babel/register');

var webpackConfig = require('./webpack/test.config.js');
var isCI = process.env.CONTINUOUS_INTEGRATION === 'true';
var runCoverage = process.env.COVERAGE === 'true' || isCI;
var devBrowser = process.env.PHANTOM ? 'PhantomJS' : 'Chrome';

var preprocessors = ['webpack', 'sourcemap'];
var reporters = ['mocha'];

if (runCoverage) {
  webpackConfig = require('./webpack/test-coverage.config');
  reporters.push('coverage');

  if (isCI) {
    reporters.push('coveralls');
  }
}

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/index.js': preprocessors
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    reporters: reporters,

    mochaReporter: {
      output: 'autowatch'
    },

    coverageReporter: {
      dir: '.coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' }
      ]
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [ isCI ? 'ChromeTravisCI' : devBrowser ],

    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    captureTimeout: 60000,
    browserNoActivityTimeout: 45000,

    singleRun: isCI
  });
};
