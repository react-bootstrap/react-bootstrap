module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'test/bindPolyfill.js',
      'test_bundle.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Firefox'],

    captureTimeout: 60000,

    singleRun: true
  });
};
