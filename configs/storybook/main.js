const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { merge: webpackMerge } = require("webpack-merge");
const rootDir = require("../utils/rootDir");
const customWebpack = require(path.resolve(rootDir, "webpack.config.js"));

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: (config, { configType }) => {
    // Pick the specific relevant fields from the main webpack config
    const customWebpackConfig = customWebpack({}, { mode: configType });
    return webpackMerge(
      config,
      {
        resolve: customWebpackConfig.resolve,
      },
      {
        resolve: {
          fallback: {
            // Required as part of build-storybook but can be disabled with no implications as the library (axe-core) provides a fallback if this is not available.
            // https://github.com/dequelabs/axe-core-npm/issues/210
            crypto: false,
          },
        },
        // NodePolyfillPlugin needed for aws-amplify integration.
        plugins: [new NodePolyfillPlugin()],
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      }
    );
  },
};
