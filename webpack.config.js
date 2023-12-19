const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const src = path.resolve(__dirname, "./src");
const dist = path.resolve(__dirname, "./dist");

module.exports = {
  entry: `${src}/js/index.js`,
  output: {
    path: `${dist}`,
    filename: "assets/js/bundle.js",
  },
  devServer: {
    static: "dist",
    open: true,
    watchFiles: [`${src}/**/*`],
    // inline: true,
    // hot: true,
    // port: 8080,
    // contentBase: dist,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: "assets/images/[name][ext]",
        },
        type: "asset/resource",
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/style.css",
    }),
    new HtmlWebpackPlugin({
      template: `${src}/pug/index.pug`,
      filename: "index.html",
    }),
  ],
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/,
  },
};
