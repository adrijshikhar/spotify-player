const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config");
const SRC_DIR = path.resolve(__dirname, "src");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const configDev = {
  devServer: {
    historyApiFallback: true,
    contentBase: SRC_DIR,
    compress: true,
    open: true,
    inline: true,
    port: 8000,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: true,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = smp.wrap(merge(common, configDev));
