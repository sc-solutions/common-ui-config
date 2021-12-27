/**
 * Peer dependencies required:
 *
 * brazil-build install --save-dev eslint-plugin-jest
 */

module.exports = {
  rules: {
    "no-new": "off",
    "jest/expect-expect": [
      "error",
      {
        assertFunctionNames: ["expect", "cdkexpect"],
      },
    ],
    "jest/no-restricted-matchers": [
      "error",
      {
        toMatchSnapshot:
          "Do not use `toMatchSnapshot` or related methods. CDK updates easily break snapshot tests.",
        toMatchInlineSnapshot:
          "Do not use `toMatchInlineSnapshot` or related methods. CDK updates easily break snapshot tests.",
        toThrowErrorMatchingSnapshot:
          "Do not use `toThrowErrorMatchingSnapshot` or related methods. CDK updates easily break snapshot tests.",
        toThrowErrorMatchingInlineSnapshot:
          "Do not use `toThrowErrorMatchingInlineSnapshot` or related methods. CDK updates easily break snapshot tests.",
      },
    ],
  },
};
