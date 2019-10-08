var UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    ssr: "./src/ssr.js",
    "ssr.min": "./src/ssr.js"
  },
  output: {
    filename: "[name].js",
    libraryExport: "default",
    library: "ssr",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};
