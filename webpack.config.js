﻿"use strict";
const path = require('path');
const minimist = require('minimist');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var argv = minimist(process.argv.slice(2));
const isWeb = (argv && argv.target === 'web');
const target = (isWeb ? 'web' : 'electron-renderer');
// DONTODO add to entry?
// 'react-hot-loader/patch',
// 'webpack-dev-server/client?http://localhost:3000',
// 'webpack/hot/only-dev-server',
const entry = (isWeb ? { site: "./src/site/app/app.tsx" } : { electron: "./src/renderer/app/app.tsx" } );
const htmlWebpackPlugin = (isWeb ? 
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/site/app/index.html',
        inject: false
    })
    :
    new HtmlWebpackPlugin({
        filename: 'electron.html',
        template: 'src/renderer/app/electron.html',
        inject: false
    })
);

module.exports = {
    devtool: "source-map",
    entry: entry,
    target: target,
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
    },
    node: {
      __dirname: false, // webpack should not override the value of __dirname (see https://github.com/electron/electron/issues/5107#issuecomment-299971806)
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        open: true,
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development')
            }
        }),
        htmlWebpackPlugin
    ],
    resolve: {
        extensions: [ 
            '.css',
            '.scss',
            '.tsx',
            '.jsx', 
            '.ts', 
            '.js', 
            '.json' 
        ]
    },
    module: {
        rules: [
            { 
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                  typeCheck: true,
                  emitErrors: true
                }
            },
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },
            {
                test: /\.scss$/,
                use: [
                    { 
                        loader: "style-loader"
                    },
                    {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            namedExport: true,
                            camelCase: true,
                            modules: true
                        }
                    },
                    { 
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            namedExport: true,
                            camelCase: true,
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)(\?\S*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {}  
            }
        ],
    }
};