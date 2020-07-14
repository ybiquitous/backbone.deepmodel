const path = require('path')
const webpack = require('webpack')

function config(production) {
  return {
    entry: './lib/index.js',

    output: {
      path: path.join(__dirname, 'dist'),
      filename: `backbone.deepmodel${production ? '.min' : ''}.js`,
      library: ['Backbone', 'DeepModel'],
      libraryTarget: 'umd',
    },

    devtool: production ? false : 'cheap-module-source-map',

    externals: {
      backbone: {
        root: 'Backbone',
        commonjs2: 'backbone',
        commonjs: 'backbone',
        amd: 'backbone',
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },

    plugins: (() => {
      const { env } = process
      const year = new Date().getFullYear()
      const author = `${env.npm_package_author_name} <${env.npm_package_author_email}>`
      const banner = `
${env.npm_package_name} v${env.npm_package_version}
Copyright ${year} ${author}
${env.npm_package_license} Licensed
        `.trim()
      const plugins = [new webpack.BannerPlugin(banner)]
      if (production) {
        plugins.push(new webpack.optimize.UglifyJsPlugin())
      }
      return plugins
    })(),
  }
}

module.exports = [config(false), config(true)]
