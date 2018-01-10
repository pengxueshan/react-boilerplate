const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const alias = require('./scripts/alias.js');
const getDefineVar = require('./scripts/define-var').getDefineVar;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const _ = require('lodash');

var noVisualization = process.env.NODE_ENV === 'production'
        || process.argv.slice(-1)[0] == '-p';

var entry = {
    core: './src/components/index.js'
};
try {
    var plugins = fs.readdirSync('./plugins');
    plugins.forEach(function(pluginId) {
        entry[pluginId] = `./plugins/${pluginId}/index.js`;
    });
} catch (e) {
    console.log(e); // eslint-disable-line
}

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
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
    devtool: 'source-map', // enum
    externals: ['net'],
    stats: 'errors-only',
    devServer: {
        proxy: {
            '/api': 'http://localhost:3333'
        },
        port: 3333,
        inline: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.[hash:8].js',
            minChunks(module, count) {
                var context = module.context;
                let isAlias = _.values(alias).some(item => {
                    return module.resource && module.resource.indexOf(item) >= 0;
                });
                return count >= 2 || (context && (context.indexOf('node_modules') >= 0 || context.indexOf('gf') >= 0 || isAlias));
            },
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: './src/main.js',
            to: './main.js'
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template/index.html',
            title: 'index',
            inject: false
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(getDefineVar()),
        (!noVisualization ?
            new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            }) : null),
    ].filter(p => p),
};