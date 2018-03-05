const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const alias = require('./scripts/alias.js');
const getDefineVar = require('./scripts/define-var').getDefineVar;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

// var noVisualization = process.env.NODE_ENV === 'production' || process.argv.slice(-1)[0] == '-p';
let showAnalyzer = true || process.argv.includes('--analyzer');

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
        new LodashModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.[hash:8].js',
        //     minChunks(module, count) {
        //         var context = module.context;
        //         let isAlias = _.values(alias).some(item => {
        //             return module.resource && module.resource.indexOf(item) >= 0;
        //         });
        //         return count >= 2 || (context && (context.indexOf('node_modules') >= 0 || context.indexOf('gf') >= 0 || isAlias));
        //     },
        // }),
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
        new webpack.DefinePlugin(getDefineVar()),
        showAnalyzer ? new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }) : null,
        new ImageminPlugin({
            disable: false,
            pngquant: {
                quality: '95-100'
            }
        }),
    ].filter(p => p),
};
