var ManifestPlugin = require('webpack-manifest-plugin')
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin")
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
var WebpackChunkHash = require("webpack-chunk-hash")
var DashboardPlugin = require('webpack-dashboard/plugin')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var helper = require('./helper')
var config = require('./config')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

var publicPath = process.env.PUBLIC_PATH || config.publicPath || '/'

const spriteFolderName = 'spritesmith-generated'

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
        alias: config.alias,
        extensions: ['.js', '.json'],
    },

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
                test: /\.ejs$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ejs-loader',
                    options: {
                        interpolate: '\\{\\{(.+?)\\}\\}',
                        evaluate: '\\[\\[(.+?)\\]\\]'
                    },
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    },
                }
            },
            {
                test: /\.(jpe?g|png|gif|jpg|svg)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                },
            }
        ]
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.PUBLIC_PATH': JSON.stringify(publicPath)
        }),

        new HtmlWebpackPlugin(Object.assign({
            template: 'src/index.html',
            /**
             * 这里都会带上/后缀
             * 因为对于vendor，此插件对于有无/后缀都正常
             * 为了兼容'/'的情况，选择都加
             */
            PUBLIC_PATH: publicPath,
            chunksSortMode: 'dependency',
        }, config)),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(config.autoprefixer || {
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                    }),
                    ...(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []),
                ],
            },
        }),

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


publicPath
