/*eslint-env node */
'use strict';

module.exports = {

  entry: './lib/backbone.deepmodel.js',

  output: {
    path: 'build',
    filename: 'backbone.deepmodel.es5.js',
    libraryTarget: 'umd'
  },

  externals: {
    'jquery': 'jQuery',
    'underscore': '_',
    'backbone': 'Backbone'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }

};
