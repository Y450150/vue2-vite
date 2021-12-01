const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
    devtool: '#cheap-module-source-map',
    output: {
        path: resolve(__dirname, '../dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /(\.less)$/,
                use: [
                    { loader: 'vue-style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }]
            },
            {
                test: /(\.css)$/,
                use: ['vue-style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar()
    ]
}