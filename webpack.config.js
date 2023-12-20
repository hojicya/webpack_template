const path = require("path");
const globule = require("globule");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const src = path.resolve(__dirname, "./src");
const dist = path.resolve(__dirname, "./dist");

const app = {
  entry: `${src}/js/index.js`,
  output: {
    path: `${dist}`,
    filename: "assets/js/bundle.js",
  },
  devServer: {
    static: "dist",
    open: true,
    watchFiles: [`${src}/**/*`],
    // port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          "sass-loader",
        ],
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/,
  },
};

const pugFiles = globule.find(`${src}/pug/*.pug`, {
  ignore: [`${src}/pug/_*.pug`, `${src}/pug/include/_*.pug`],
});

pugFiles.forEach((pug) => {
  const file = pug.split("/").slice(-1)[0].replace(".pug", ".html");
  app.plugins.push(
    new HtmlWebpackPlugin({
      inject: "body",
      filename: `${dist}/${file}`,
      template: pug,
    })
  );
});

module.exports = app;
