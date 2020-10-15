'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');


module.exports = {
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  resolve:{
    extensions: ['.js', '.vue', '.json'],
    alias:{
    '@': path.resolve('src'),
    },  
  },  
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'vue-style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },  
      {
        test: /\.(ttf|eot|svg|jpe?g|gif|png|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
              loader: 'file-loader'
          }]
      } 
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}