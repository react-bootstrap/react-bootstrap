module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'test_bundle.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false
  });
};
