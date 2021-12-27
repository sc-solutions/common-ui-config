/**
 * Peer dependencies required:
 *
 * brazil-build install --save-dev eslint-plugin-jest eslint-plugin-testing-library
 */

module.exports = {
  plugins: ["jest"],
  rules: {
    "jest/expect-expect": [
      "warn",
      {
        assertFunctionNames: [
          "expect",
          "*.getBy*",
          "*.getAllBy*",
          "*.findBy*",
          "*.findAllBy*",
        ],
      },
    ],
  },
};
