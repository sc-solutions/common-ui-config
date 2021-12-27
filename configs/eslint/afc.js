/*
Usage:

extends: [require.resolve("@sc-solutions/common-ui-config/configs/eslint/af")]
*/

module.exports = {
  extends: ["./af/js-config.js", "./react-global-config.js"],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "./af/ts-config.js",
      ],
      files: ["*.ts", "*.tsx"],
    },
    {
      extends: [
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "./af/react-config.js",
      ],
      files: ["*.jsx", "*.tsx"],
    },
    {
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
        "./af/jest-config.js",
      ],
      files: ["*.test.js", "*.test.ts", "*.test.jsx", "*.test.tsx"],
    },
    {
      extends: ["./react-testing-library-config.js"],
      files: ["*.test.jsx", "*.test.tsx"],
    },
    {
      extends: ["./af/storybook-config.js"],
      files: ["*.stories.jsx", "*.stories.tsx"],
    },
  ],
};
