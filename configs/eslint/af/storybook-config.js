module.exports = {
  plugins: ["@typescript-eslint"],
  extends: ["../storybook-config.js"],
  rules: {
    "func-style": "off",
    "react/function-component-definition": "off",
    "@typescript-eslint/naming-convention": "off",
  },
};
