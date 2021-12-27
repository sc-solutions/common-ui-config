module.exports = {
  reject: [
    "@types/node", // Should match the version of Node we are using
    "babel-plugin-emotion", // Must lock version to 10.x to match emotion
  ],
};
