const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isDev = process.env.NODE_ENV === 'development';

const styleLoaders = (isModule) => {
  const CSSLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        mode: isModule ? 'local' : 'global',
        localIdentName: isModule ? (isDev ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]') : null,
        exportLocalsConvention: 'camelCase',
      },
      importLoaders: 2,
      sourceMap: isDev,
    },
  };

  const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      postcssOptions: {},
    },
  };

  return [isDev ? 'isomorphic-style-loader' : MiniCssExtractPlugin.loader, CSSLoader, PostCSSLoader, 'sass-loader'];
};

module.exports = {
  stats: {
    errorDetails: true,
  },
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
    injectClient: false,
    index: '',
  },
  entry: {
    index: ['webpack-dev-server/client?http://localhost:8080', path.join(__dirname, 'src', 'index.js')],
    server: path.join(__dirname, 'src', 'server.js'),
  },
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'node',
  externals: [
    {
      'serialize-javascript': 'commonjs2 serialize-javascript',
    },
    nodeExternals(),
  ],
  plugins: [new HtmlWebpackPlugin(), isDev ? new ESLintWebpackPlugin() : null],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: styleLoaders(true),
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: styleLoaders(),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
