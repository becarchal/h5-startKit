var ManifestPlugin = require('webpack-manifest-plugin')
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin")
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
var WebpackChunkHash = require("webpack-chunk-hash")
var DashboardPlugin = require('webpack-dashboard/plugin')
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var _ = require('lodash')


const config = require(path.join(__dirname, '/../src/config.js')) || {}

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/'

module.exports = {
    entry: {
        'index': ['babel-polyfill', path.join(__dirname, '/../src/index.js')],
    },

    output: {
        path: path.join(__dirname, '/../dist'),
        /**
         * hot热替换模式不支持chunkhash
         */
        // filename: '[name].[chunkhash].js',
        publicPath: PUBLIC_PATH,
        sourceMapFilename: '[name].map'
    },

    externals: config.extensions,

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        // modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    // externals: {
    //     dat: "dat"
    // },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0'],
                        plugins: ['lodash']
                    }
                },
                exclude: /node_modules|lib/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-loader',
                    options: {
                        interpolate: '\\{\\{(.+?)\\}\\}',
                        evaluate: '\\[\\[(.+?)\\]\\]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader',
                }
            }
        ]

    },

    plugins: [

        new DashboardPlugin(),

        new HtmlWebpackPlugin(_.assign({
            template: 'src/index.ejs',
            /**
             * 这里都会带上/后缀
             * 因为对于vendor，此插件对于有无/后缀都正常
             * 为了兼容'/'的情况，选择都加
             */
            publicPath: PUBLIC_PATH,
            chunksSortMode: 'dependency',
        }, config)),

        new ExtractTextPlugin('styles.[chunkhash].css'),

        new webpack.DefinePlugin({
            'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
        }),

        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '/../public'),
                to: path.join(__dirname, '/../dist'),
            }
        ])
    ].concat(config.provide ?
        new webpack.ProvidePlugin(config.provide) : [])
}
