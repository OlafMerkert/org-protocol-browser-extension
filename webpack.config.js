module.exports = {
  module: {
    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" }, { test: /\.css$/ }],
  },
  devtool: "source-map",
};
