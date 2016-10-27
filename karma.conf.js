/* eslint-env node */
const path = require('path')
const webpackConfig = require('./webpack.config')[0]

process.env.NODE_ENV = process.env.NODE_ENV || 'test'

module.exports = function (config) {
  const autoWatch = (process.argv.indexOf('--auto-watch') >= 0)

  const settings = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'test',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      '**/*_spec.js'
    ],

    // list of files to exclude
    exclude: [],

    client: {
      mocha: {}
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*_spec.js': ['webpack']
    },

    webpack: {
      devtool: autoWatch ? 'cheap-module-inline-source-map' : null,
      module: webpackConfig.module
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'].concat(autoWatch ? [] : ['coverage', 'threshold']),

    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'}
      ]
    },

    thresholdReporter: {
      statements: 100,
      branches: 98,
      functions: 100,
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
    browsers: ['jsdom'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  }

  // https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables
  if (process.env.SAUCELABS === 'true' &&
      process.env.TRAVIS === 'true' &&
      process.env.TRAVIS_PULL_REQUEST === 'false' &&
      process.env.TRAVIS_NODE_VERSION === '7') {
    settings.sauceLabs = {
      testName: 'backbone.deepmodel unit tests'
    }
    settings.customLaunchers = {
      ie11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: 'latest'
      },
      edge: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: 'latest'
      },
      chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 10',
        version: 'latest'
      },
      firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: 'latest'
      },
      safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: 'latest'
      }
    }
    settings.browsers = Object.keys(settings.customLaunchers)
    settings.reporters = ['dots', 'saucelabs']
  }

  config.set(settings)
}
