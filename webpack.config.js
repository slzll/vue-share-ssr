var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-import"), require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "img/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash:8].[ext]"
        }
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
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.min\.css$/
    })
  ]
};
