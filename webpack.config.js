const path = require("path");
const webpack = require("webpack");
const Visualizer = require("webpack-visualizer-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const distFolder = path.resolve(__dirname, "target", "dist");

module.exports = {
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      browser: "webextension-polyfill",
    }),
    new CleanWebpackPlugin([distFolder]),
    new HtmlWebpackPlugin({
      title: "Org Protocol Browser Extension",
      filename: "capturePopup.html",
      chunks: ["capturePopup"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "templates", "manifest.json.template"),
      inject: false,
      filename: "manifest.json",
      chunks: ["captureKeys"],
    }),
    new CopyWebpackPlugin([{ from: "icons/*.png" }]),
    new Visualizer({
      filename: path.join("..", "report", "bundle-size-report.html"),
    }),
  ],
  entry: {
    capturePopup: "./src/capturePopup.js",
    captureKeys: "./src/captureKeys.js",
  },
  output: {
    path: distFolder,
    filename: "[name].[contenthash].js",
  },
};
