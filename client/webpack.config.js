const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {
    index: './src/pages/main/index.ts',
    user: './src/pages/user/index.ts',
    recipe: './src/pages/recipe/index.ts',
    recipes: './src/pages/recipes/index.ts',
    article: './src/pages/article/index.ts',
    articles: './src/pages/articles/index.ts',
    constructor: './src/pages/constructor/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: {
      keep: /\.git/,
    },
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/main/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/user/user-page.html',
      filename: 'user-page.html',
      chunks: ['user'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/recipe/index.html',
      filename: 'recipe.html',
      chunks: ['recipe'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/recipes/index.html',
      filename: 'recipes.html',
      chunks: ['recipes'],
      inject: 'body',
    }),
    new EslintPlugin({
      extensions: 'ts',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/article/index.html',
      filename: 'article.html',
      chunks: ['article'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/articles/index.html',
      filename: 'articles.html',
      chunks: ['articles'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/constructor/constructor.html',
      filename: 'constructor.html',
      chunks: ['constructor'],
      inject: 'body',
    }),
    new EslintPlugin({
      extensions: 'ts',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|ttf|woff|woff2|png|jpe?g|gif)$/i,
        type: isProduction ? 'asset' : 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
