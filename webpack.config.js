const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DIST_DIR = path.resolve(__dirname, "public");
const SRC_DIR = path.resolve(__dirname, "src");
const Dotenv = require("dotenv-webpack");

const config = {
  entry: {
    path: `${SRC_DIR}/app/Index.js`
  },
  output: {
    filename: "bundle.js",
    path: `${DIST_DIR}/app`,
    publicPath: "/app/",
    pathinfo: false
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: ["node_modules", `${SRC_DIR}/app`]
  },
  module: {
    rules: [
      {
        test: /(\.scss)$/,
        include: `${SRC_DIR}/app/styles`,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(html)$/,
        include: `${SRC_DIR}/index.html`,
        exclude: [/(node_modules|bower_components)/, `${SRC_DIR}/app/`],
        use: {
          loader: "html-loader",
          options: {
            minimize: false,
            removeComments: true,
            collapseWhitespace: false
          }
        }
      },
      {
        test: /\.js?/,
        include: [`${SRC_DIR}/app/components`, `${SRC_DIR}/app/Index.js`],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          },
          "eslint-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|svg)(\?[a-z0-9=.]+)?$/,
        include: `${SRC_DIR}/app/images`,
        loader: "url-loader?limit=10000&name=images/[hash].[ext]"
      },
      {
        test: /\.(woff|woff2)?/,
        include: `${SRC_DIR}/app/fonts`,
        loader:
          "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      //
      // default: false
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true
    }),
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: `${DIST_DIR}/index.html`,
      inject: false
    }),
    new webpack.ProgressPlugin()
  ]
};

module.exports = config;
