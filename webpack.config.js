/* eslint-env node */
const util = require('util');
const webpack = require('webpack');
const pkg = require('./package');

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
            plugins: ['add-module-exports', 'transform-object-assign']
          }
        }
      ]
    },

    plugins: (function() {
      const plugins = [
        new webpack.BannerPlugin(util.format(
          '%s v%s\nCopyright 2015 %s\n%s Licensed',
          pkg.name, pkg.version, pkg.author, pkg.license
        ))
      ];
      if (production) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
      }
      return plugins;
    })()
  };
}

module.exports = [config(false), config(true)];
