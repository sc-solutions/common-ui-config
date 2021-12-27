const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const rootDir = process.cwd();
const packageJson = require(path.join(rootDir, "package.json"));
const packageJsonDependencies = packageJson.dependencies;

const sharedDependencies = [
  "emotion",
  "react-document-title",
  "react-dom",
  "react-router-dom",
  "react",
];

const sharedDependencyConfig = sharedDependencies.reduce(
  (configBuilder, dependencyName) => {
    configBuilder[dependencyName] = {
      singleton: true,
      eager: false,
      requiredVersion: packageJsonDependencies[dependencyName],
    };
    return configBuilder;
  },
  {}
);

module.exports = function (appName, exposes, remoteModules) {
  return {
    context: path.resolve(rootDir, "src"),
    entry: ["./index"],
    output: {
      path: path.resolve(rootDir, "dist", appName),
      filename: "[name].[contenthash].js",
      publicPath: "auto",
      uniqueName: appName,
      assetModuleFilename: "[name].[contenthash][ext]",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(rootDir, "tsconfig.json"),
        },
      }),
      new ModuleFederationPlugin({
        name: appName,
        filename: "remoteEntry.js",
        exposes: exposes,
        shared: sharedDependencyConfig,
        remotes: remoteModules,
      }),
      new NodePolyfillPlugin(), // webpack 5 does not polyfill node plugins.  This is needed for AWS-Amplify (Identity Client Dependency)
    ],
    resolve: {
      alias: {
        "~": path.resolve(rootDir, "src"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      /**
       * https://webpack.js.org/configuration/resolve/
       * By default webpack5 does not have these.  Set to false to remove errors.  The needed modules
       * are supplied by the NodePolyfillPlugin
       */
      fallback: {
        fs: false,
        child_process: false,
        http2: false,
      },
    },
    module: {
      rules: [
        /**
         * This rule is needed to resolve the graphql error for AWS-Amplify
         * https://github.com/graphql/graphql-js/issues/2721
         */
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(j|t)s(x?)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(s?)css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
          sideEffects: true,
        },
        {
          test: /\.(woff2|woff|ttf|png|jpg|jpeg|gif)$/,
          type: "asset",
        },
        {
          test: /\.svg$/,
          type: "asset",
          generator: {
            dataUrl: (content) => svgToMiniDataURI(content.toString()),
          },
        },
      ],
    },
    stats: "errors-warnings",
  };
};
