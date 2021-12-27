/**
 * Peer dependencies required:
 *
 * NOTE: We are using the Jest plugin to reduce dependencies and use a better supported plugin. Cypress doesn't use Jest but many plugins work the same since syntax is similar enough.
 *
 * brazil-build install --save-dev eslint-plugin-cypress eslint-plugin-chai-friendly eslint-plugin-jest
 */

module.exports = {
  plugins: ["cypress", "chai-friendly", "jest"],
  extends: ["plugin:cypress/recommended", "plugin:chai-friendly/recommended"],
  env: {
    node: true,
  },
  rules: {
    "jest/consistent-test-it": [
      "warn",
      {
        withinDescribe: "it",
      },
    ],
    "jest/expect-expect": [
      "warn",
      {
        assertFunctionNames: ["expect", "cy.**.should"],
      },
    ],
    "jest/no-commented-out-tests": "warn",
    "jest/no-conditional-expect": "error",
    "jest/no-done-callback": "warn",
    "jest/no-export": "warn",
    "jest/no-focused-tests": "warn",
    "jest/no-identical-title": "warn",
    "jest/no-if": "error",
    "jest/require-top-level-describe": "error",
    "jest/no-test-return-statement": "error",
    "jest/valid-title": "warn",
  },
};
