const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const distFolder = path.resolve(__dirname, "target", "dist");

const currentVersion = process.env.npm_package_version;

module.exports = {
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["!icons/*.png"], // needed so icons are not deleted in watch mode
    }),
    new HtmlWebpackPlugin({
      title: "Org Protocol Browser Extension",
      filename: "capturePopup.html",
      chunks: ["capturePopup"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "templates", "manifest.json.template"),
      inject: false,
      filename: "manifest.json",
      chunks: ["captureKeys", "jiraTasks"],
      currentVersion,
    }),
    new CopyWebpackPlugin({ patterns: [{ from: "icons/*.png" }] }),
  ],
  entry: {
    capturePopup: "./src/capturePopup.js",
    captureKeys: "./src/captureKeys.js",
    jiraTasks: "./src/jiraTasks.js",
  },
  output: {
    path: distFolder,
    filename: "[name].[contenthash].js",
  },
};
