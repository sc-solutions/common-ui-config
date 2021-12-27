/**
 * Peer dependencies required:
 *
 * brazil-build install --save-dev eslint-plugin-react eslint-plugin-react-hooks
 */

module.exports = {
  plugins: ["react", "react-hooks"],
  extends: ["plugin:react-hooks/recommended"],
  rules: {
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
  },
};
