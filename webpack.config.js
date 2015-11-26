/* eslint-env node */
'use strict';
var webpack = require('webpack');

function config(production) {
  return {
    entry: './lib/index.js',

    output: {
      path: './dist',
      filename: 'backbone.deepmodel' + (production ? '.min' : '') + '.js',
      library: ['Backbone', 'DeepModel'],
      libraryTarget: 'umd'
    },

    devtool: (production ? undefined : 'cheap-module-source-map'),

    externals: {
      'backbone': {
        root: 'Backbone',
        commonjs2: 'backbone',
        commonjs: 'backbone',
        amd: 'backbone'
      }
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: ['add-module-exports']
          }
        }
      ]
    },

    plugins: (production ? [new webpack.optimize.UglifyJsPlugin()] : [])
  };
}

module.exports = [config(false), config(true)];
