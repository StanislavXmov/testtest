const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ];
  return loaders;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyPlugin([
        { 
          from: path.resolve(__dirname, 'src/favicon.ico'), 
          to: path.resolve(__dirname, 'dist') 
        },
        { 
          from: path.resolve(__dirname, 'src/images'), 
          to: path.resolve(__dirname, 'dist') 
        },
      ]
    ),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(otf|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  }
}