/* eslint-env node */
const path = require('path');
const webpackConfig = require('./webpack.config')[0];
const isWindows = /^win/.test(process.platform);

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'test',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      '**/*_spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*_spec.js': ['webpack']
    },

    webpack: {
      module: (function() {
        const module = webpackConfig.module;
        if (process.argv.indexOf('--auto-watch') === -1) {
          module.postLoaders = [{
            test: /\.js$/,
            exclude: /(test|node_modules)/,
            loader: 'istanbul-instrumenter'
          }];
        }
        return module;
      })()
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'threshold'],

    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'}
      ]
    },

    thresholdReporter: {
      statements: 87,
      branches: 70,
      functions: 90,
      lines: 100
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: (function() {
      const browsers = [
        'PhantomJS',
        process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome',
        'Firefox'
      ];
      if (isWindows) {
        browsers.push('IE');
      }
      return browsers;
    })(),

    customLaunchers: {
      'Chrome_travis_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  });
};
