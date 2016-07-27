/* eslint-env node */
const webpackConfig = require('./webpack.config')[0]

module.exports = function (config) {
  const customLaunchers = {
    ie8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '8.0'
    },
    ie11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
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
      platform: 'Windows 8.1',
      version: 'latest'
    },
    firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 8.1',
      version: 'latest'
    },
    safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: 'latest'
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
