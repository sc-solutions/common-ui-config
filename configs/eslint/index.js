/*
    ESLint Rule Documentation Sites
        https://eslint.org/docs/rules/
        https://github.com/yannickcr/eslint-plugin-react
        https://github.com/benmosher/eslint-plugin-import
        https://github.com/testing-library/eslint-plugin-testing-library
        https://github.com/jest-community/eslint-plugin-jest
        https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
*/

module.exports = {
  extends: ["./js-config.js", "./react-global-config.js"],
  overrides: [
    {
      extends: ["./ts-config.js"],
      files: ["*.ts", "*.tsx"],
    },
    {
      extends: ["./react-config.js"],
      files: ["*.jsx", "*.tsx"],
    },
    {
      extends: ["./jest-config.js"],
      files: [
        "*.test.js",
        "*.test.ts",
        "*.test.jsx",
        "*.test.tsx",
        "*.spec.js",
        "*.spec.ts",
        "*.spec.jsx",
        "*.spec.tsx",
      ],
    },
    {
      extends: ["./react-testing-library-config.js"],
      files: ["*.test.jsx", "*.test.tsx", "*.spec.jsx", "*.spec.tsx"],
    },
    {
      extends: ["./storybook-config.js"],
      files: ["*.stories.jsx", "*.stories.tsx"],
    },
  ],
};
