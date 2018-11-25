"use strict;"
const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: [
        'babel-polyfill', 
        "./app.js"
    ],
    output: {
        path: path.resolve(__dirname, "./build"),
        publicPath: '/build/',
        filename: "bundle.js"
    }, 
    watch: true,

    
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options:{
                    presets:["env", "es2015", "stage-0", "react"]   
                }
               
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'less-loader']
                })
              },
              
              {
                test: /\.(png|jpg|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash:8].[ext]'
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
        
    ],
    
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
      },
    devServer: {
        historyApiFallback: true
      }
}