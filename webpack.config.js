// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  node: {
    fs: 'empty'
  }

  return {
    mode,
    entry: "./src/index.js",
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: "bundled.js"
    }
  };
};
