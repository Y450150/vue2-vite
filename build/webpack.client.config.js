const webpack = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.config.js')
const { resolve } = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
    mode: isProd ? 'production' : 'development',
    devtool: '#source-map',
    entry: {
        app: resolve(__dirname, '../src/entry-client.js')
    },
    output: {
        filename: 'client-bundle.js'
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin()
    ]
}) 