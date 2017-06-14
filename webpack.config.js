/* eslint-env node */
const path = require('path')
const util = require('util')
const webpack = require('webpack')

function config (production) {
  return {
    entry: './lib/index.js',

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'backbone.deepmodel' + (production ? '.min' : '') + '.js',
      library: ['Backbone', 'DeepModel'],
      libraryTarget: 'umd'
    },

    devtool: (production ? false : 'cheap-module-source-map'),

    externals: {
      'backbone': {
        root: 'Backbone',
        commonjs2: 'backbone',
        commonjs: 'backbone',
        amd: 'backbone'
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },

    plugins: (function () {
      const plugins = [
        new webpack.BannerPlugin(util.format(
          '%s v%s\nCopyright 2015 %s <%s>\n%s Licensed',
          process.env.npm_package_name,
          process.env.npm_package_version,
          process.env.npm_package_author_name,
          process.env.npm_package_author_email,
          process.env.npm_package_license
        ))
      ]
      if (production) {
        plugins.push(new webpack.optimize.UglifyJsPlugin())
      }
      return plugins
    })()
  }
}

module.exports = [config(false), config(true)]
