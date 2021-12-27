/**
 * Peer dependencies required:
 *
 * brazil-build install --save-dev eslint-plugin-react eslint-plugin-jsx-a11y
 */

module.exports = {
  plugins: ["react", "jsx-a11y"],
  extends: ["plugin:react/recommended", "plugin:jsx-a11y/recommended"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-access-state-in-setstate": "error",
    "react/no-array-index-key": "error",
    "react/no-danger": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "warn",
    "react/self-closing-comp": "warn",
    "react/void-dom-elements-no-children": "error",
    "react/jsx-boolean-value": ["warn", "always"],
    "react/jsx-fragments": "warn",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
    "react/jsx-pascal-case": "warn",
    "react/jsx-props-no-spreading": "warn",
  },
};
