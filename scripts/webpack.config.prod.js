const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const alias = require('./alias.js');
// const getDefineVar = require('./define-var').getDefineVar;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// var isProd = true;

var entry = {
    app: './src/index.js'
};

const srcDir = path.resolve(process.cwd(), 'src');
const distDir = path.resolve(process.cwd(), 'dist');

module.exports = {
    entry: entry,
    output: {
        path: distDir,
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        }, {
            test: /\.{jpg|jpeg|gif|png|svg}/,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        }]
    },
    resolve: {
        modules: [
            'node_modules',
            srcDir
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: alias
    },
    mode: 'production',
    stats: 'errors-only',
    target: 'web',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
        minimize: true
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(process.cwd(), 'src/template/index.html'),
            title: 'index',
            inject: true
        }),
        new webpack.NamedModulesPlugin(),
        // new webpack.DefinePlugin(getDefineVar(isProd)),
        new ImageminPlugin({
            disable: false,
            pngquant: {
                quality: '95-100'
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            ignoreOrder: true
        }),
    ].filter(p => p),
};
