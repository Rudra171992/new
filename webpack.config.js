const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
    
          // First Rule
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
    
          // Second Rule
          {
            test: /\.(scss|css)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  modules : {
                    localIdentName: '[name]__[local]__[hash:base64:5]',
                  },
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          }
        ]
      },
    plugins: [
    new HtmlWebpackPlugin({
        template: 'public/index.html'
        }),
    new ESLintPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        open: true
    }
  // Webpack configuration goes here
};