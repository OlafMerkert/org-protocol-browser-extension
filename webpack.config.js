const Visualizer = require("webpack-visualizer-plugin");

module.exports = {
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devtool: "source-map",
  plugins: [new Visualizer({ filename: "./bundle-size-report.html" })],
};
