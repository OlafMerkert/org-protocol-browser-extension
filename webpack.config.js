const path = require("path");
const Visualizer = require("webpack-visualizer-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    new CleanWebpackPlugin([distFolder]),
    new HtmlWebpackPlugin({
      title: "Org Protocol Browser Extension",
      filename: "capturePopup.html",
    }),
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
  },
};
