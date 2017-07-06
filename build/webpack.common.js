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
var helper = require('./helper')
var config = require('./config')

const publicPath = process.env.PUBLIC_PATH || config.publicPath || '/'

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
        publicPath,
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

        new HtmlWebpackPlugin(Object.assign({
            template: 'src/index.ejs',
            /**
             * 这里都会带上/后缀
             * 因为对于vendor，此插件对于有无/后缀都正常
             * 为了兼容'/'的情况，选择都加
             */
            publicPath,
            chunksSortMode: 'dependency',
        }, config)),

        new ExtractTextPlugin('styles.[chunkhash].css')


    ].concat(helper.fsExistsSync(path.join(__dirname, '/../public')) ?
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '/../public'),
                to: path.join(__dirname, '/../dist'),
            }
        ]) : [])
        .concat(config.provide ?
            new webpack.ProvidePlugin(config.provide) : [])
}
