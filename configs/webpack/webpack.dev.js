const fs = require("fs");
const os = require("os");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = function (port, htmlRequired) {
  const devServerConfig = {
    hot: false,
    port: port,
    static: false,
    allowedHosts: "all",
    client: {
      logging: "verbose",
    },
    historyApiFallback: true,
  };

  // The dev server can be hosted with an SSL certificate if ~/certs/private.key and ~/certs/private.pem exist on the system.
  const privateKeyPath = path.join(os.homedir(), "certs/private.key");
  const certPath = path.join(os.homedir(), "certs/private.pem");
  if (fs.existsSync(privateKeyPath) && fs.existsSync(certPath)) {
    devServerConfig.https = {
      key: fs.readFileSync(privateKeyPath),
      cert: fs.readFileSync(certPath),
    };
  }

  const plugins = [];
  if (htmlRequired) {
    plugins.push(
      new HTMLWebpackPlugin({
        template: path.join(process.cwd(), "/public/index.html"),
      })
    );
  }

  return {
    mode: "development",
    plugins: [...plugins],
    devServer: devServerConfig,
    devtool: "source-map",
  };
};
