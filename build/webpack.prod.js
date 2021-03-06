const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = Merge(CommonConfig, {
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'postcss-loader',
                    ],
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ],
                })
            },
            {
                test: /\.(jpe?g|png|gif|jpg|svg)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            quality: 65
                        },
                        pngquant: {
                            quality: "65-90",
                            speed: 4
                        },
                        svgo: {
                            plugins: [{
                                removeViewBox: false
                            }, {
                                removeEmptyAttrs: false
                            }]
                        },
                        gifsicle: {
                            optimizationLevel: 7,
                            interlaced: false
                        },
                        optipng: {
                            optimizationLevel: 7,
                            interlaced: false
                        }
                    },
                }
            }]
    },

    plugins: [

        new ExtractTextPlugin('styles.[chunkhash].css'),

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
        }),



    ]
})





