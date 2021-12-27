module.exports = {
  extends: ["../jest-config.js"],
  rules: {
    "jest/prefer-spy-on": "warn",
    "jest/lowercase-name": ["warn", { ignoreTopLevelDescribe: true }],
  },
};
