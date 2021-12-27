module.exports = {
  extends: ["../js-config.js"],
  rules: {
    "no-else-return": "warn",
    "func-names": ["warn", "never"],
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",
    "prefer-arrow-callback": "warn",
    "no-restricted-syntax": [
      "warn",
      {
        selector: "CallExpression[callee.name='String']",
        message: "Don't use the String function. Use .toString() instead.",
      },
      {
        selector: "CallExpression[callee.name='Number']",
        message:
          "Don't use the Number function. Use parseInt or parseFloat instead.",
      },
      {
        selector: "CallExpression[callee.name='Boolean']",
        message:
          "Don't use the Boolean function. Use a strict comparison instead.",
      },
    ],
  },
};
