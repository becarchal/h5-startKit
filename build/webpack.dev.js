const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var webpack = require('webpack')
var path = require('path')

const config = require(path.join(__dirname, '/../src/config.js')) || {}

module.exports = Merge(CommonConfig, {
    devtool: 'cheap-module-source-map',

    output: {
        filename: '[name].[hash].js',
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|jpg|svg)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },

    devServer: {
        port: config.port || 8888,
        host: config.host || 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        /**
         * https://github.com/webpack/webpack/issues/1151
         */
        inline: true,
        hot: true
    },

    plugins: [
        //http://stackoverflow.com/questions/30835213/react-from-npm-cannot-be-used-on-the-client-because-development-is-not-defined
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ]
})