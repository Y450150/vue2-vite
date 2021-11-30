const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { resolve } = require('path')
const base = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: resolve(__dirname, '../client/entry-server.js'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  mode: isProd ? 'production' : 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
  ]
})