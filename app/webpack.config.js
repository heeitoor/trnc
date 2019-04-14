const webpack = require("webpack");

var dotenv = require("dotenv").config({ path: __dirname + "/.env" });

const Dotenv = require("dotenv-webpack");

console.log(new Dotenv());

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new Dotenv(),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify({ a: "teste" })
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true
  },
  node: {
    fs: "empty"
  }
};
