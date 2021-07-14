/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './build',
    port: 4000,
    hot: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 2, modules: true } }, 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html'),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.woff2$/,
          attributes: { as: 'font', type: 'font/woff2', crossorigin: true },
        },
        {
          match: /\.[a-z-0-9]*.css$/,
          attributes: { as: 'style' },
        },
      ],
    }),
  ],
};
