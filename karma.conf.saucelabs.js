/* eslint-env node */
const webpackConfig = require('./webpack.config')[0]

module.exports = function (config) {
  const customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  }

  config.set({
    basePath: 'test',
    frameworks: ['mocha'],
    files: ['**/*_spec.js'],
    client: { mocha: {} },
    preprocessors: { '**/*_spec.js': ['webpack'] },
    webpack: {
      module: webpackConfig.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    sauceLabs: {
      testName: 'Web App Unit Tests'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    singleRun: true,
    colors: false
  })
}
