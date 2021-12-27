module.exports = {
  extends: ["../cypress-config.js"],
  rules: {
    "jest/lowercase-name": ["warn", { ignoreTopLevelDescribe: true }],
  },
};
