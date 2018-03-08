const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const alias = require('./scripts/alias.js');
const getDefineVar = require('./scripts/define-var').getDefineVar;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var isProd = true;

var entry = {
    core: './src/components/core/index.js'
};

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js',
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
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: alias
    },
    externals: ['net'],
    stats: 'errors-only',
    plugins: [
        new LodashModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: './src/main.js',
            to: './main.js'
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template/index.html',
            title: 'index',
            inject: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(getDefineVar(isProd)),
        new ImageminPlugin({
            disable: false,
            pngquant: {
                quality: '95-100'
            }
        }),
        new UglifyJsPlugin()
    ].filter(p => p),
};
