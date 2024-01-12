/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    mode: env.mode === "development" ? "development" : "production",
    context: path.resolve(__dirname, "src"),
    entry: "./index.ts",
    devtool: "inline-source-map",
    output: {
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                presets: [["@babel/preset-env", { targets: { node: "8" } }]],
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '"Life" game',
      }),
    ],
  };
};
