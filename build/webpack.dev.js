const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var webpack = require('webpack')
var path = require('path')
var config = require('./config')


module.exports = Merge(CommonConfig, {
    devtool: 'eval',

    output: {
        filename: '[name].[hash].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ]
    },

    devServer: {
        port: config.port,
        host: config.host,
        /**
         * https://github.com/webpack/webpack/issues/1151
         */
        inline: true,
        hot: true,
    },

    plugins: [
        //http://stackoverflow.com/questions/30835213/react-from-npm-cannot-be-used-on-the-client-because-development-is-not-defined
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ]
})
