const path = require("path");
const rootDir = require("../utils/rootDir");
const customWebpack = require(path.resolve(rootDir, "webpack.config.js"));
const customWebpackConfig = customWebpack({}, { mode: "development" });

module.exports = (app) => {
  app.all("*", (req, res, next) => {
    if (
      req.hostname !== "localhost" &&
      customWebpackConfig.devServer?.host === "localhost"
    ) {
      res
        .status(403)
        .send(
          "Error: To run on a server, you must configure AUTH_PASSWORD in your .env file."
        );
      return;
    }
    next();
  });
  customWebpackConfig.devServer?.onBeforeSetupMiddleware?.({ app: app });
};
