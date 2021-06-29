const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const styleLoaders = (isModule) => {
  const CSSLoaderOptions = {
    modules: {
      mode: isModule ? 'local' : 'global',
      exportLocalsConvention: 'asIs',
    },
    esModule: false,
    importLoaders: 2,
    sourceMap: isDev,
  };

  if (isModule) {
    CSSLoaderOptions.modules.localIdentName = isDev ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]';
  }

  const CSSLoader = {
    loader: 'css-loader',
    options: CSSLoaderOptions,
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

const plugins = (...extra) => {
  return [new HtmlWebpackPlugin(), isDev ? new ESLintWebpackPlugin() : null, ...extra];
};

const commonConfigParts = {
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
        resolve: {
          aliasFields: ['main'],
        },
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

const serverConfig = {
  ...commonConfigParts,
  entry: {
    server: path.join(__dirname, 'src', 'server'),
  },
  plugins: plugins(),
  target: 'node',
};

const clientConfig = {
  ...commonConfigParts,
  entry: {
    index: ['webpack-dev-server/client?http://localhost:8080', path.join(__dirname, 'src', 'client')],
  },
  plugins: plugins(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ),
  devServer: {
    historyApiFallback: true,
    writeToDisk: true,
    injectClient: false,
    index: '',
    proxy: {
      context: () => true,
      target: 'http://localhost:8081',
      bypass: (req) => {
        if (req.headers.accept.indexOf('html') !== -1) {
          return null;
        }
        return req.url;
      },
    },
  },
};

module.exports = [clientConfig, serverConfig];
