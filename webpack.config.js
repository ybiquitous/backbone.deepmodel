/*eslint-env node */
'use strict';

module.exports = {

  entry: './lib/backbone.deepmodel.js',

  output: {
    path: 'build',
    filename: 'backbone.deepmodel.es5.js',
    library: ['Backbone', 'DeepModel'],
    libraryTarget: 'umd'
  },

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
  }

};
