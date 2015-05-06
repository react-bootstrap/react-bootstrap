/* eslint no-var: 0 */
require('babel/register');

var webpackConfig = require('./webpack/test.config.js');
var isCI = process.env.CONTINUOUS_INTEGRATION === 'true';

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],

    files: [
      'test/index.js'
    ],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: isCI
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch'
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: [ isCI ? 'PhantomJS' : 'Chrome' ],

    captureTimeout: 60000,
    browserNoActivityTimeout: 30000,

    singleRun: isCI
  });
};
