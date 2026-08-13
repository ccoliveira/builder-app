var config = require('../config')
var webpack = require('webpack')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = Object.assign({}, baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: baseWebpackConfig.module.rules.concat(
      utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    )
  },
  devtool: '#eval-source-map',
  plugins: baseWebpackConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ])
})
