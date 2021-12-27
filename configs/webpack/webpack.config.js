require("dotenv").config();

const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge: webpackMerge } = require("webpack-merge");
const rootDir = require("../utils/rootDir");
const packageJson = require(path.join(process.cwd(), "package.json"));
const webpackCommon = require("./webpack.common");
const webpackDev = require("./webpack.dev");
const webpackProd = require("./webpack.prod");

const DEFAULT_OPTIONS = {
  port: 5000,
  exposes: undefined,
  remoteModules: undefined,
  appName: packageJson.name
    .replace("@sc-solutions/", "")
    .toLowerCase()
    .replace(/[^a-z]/g, ""),
};

module.exports = function (env = {}, argv = {}, options = {}, extras = {}) {
  const isProduction = argv.mode === "production";

  const optionValues = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const commonWebpackConfig = webpackCommon(
    optionValues.appName,
    optionValues.exposes,
    optionValues.remoteModules
  );

  if (env.showBundleAnalysis) {
    return webpackMerge(commonWebpackConfig, webpackProd(), {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: path.join(rootDir, "build/temp/bundleAnalysis.html"),
          defaultSizes: "parsed",
          openAnalyzer: true,
        }),
      ],
    });
  }
  if (isProduction) {
    return webpackMerge(commonWebpackConfig, webpackProd());
  }
  return webpackMerge(
    commonWebpackConfig,
    webpackDev(optionValues.port, extras.htmlRequired)
  );
};
