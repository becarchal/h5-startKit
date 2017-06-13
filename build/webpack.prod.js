const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
var webpack = require('webpack')
var path = require('path')


module.exports = Merge(CommonConfig, {
    output: {
        filename: '[name].[chunkhash].js',
    },

    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        
        /**
         * 假设vendor是从node_modules里导入的
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),

        /**
        * 使用manifest文件来提取webpack runtime代码
        * 避免vendorhash发生错误变化
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),


        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})