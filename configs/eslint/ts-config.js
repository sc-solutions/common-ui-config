/**
 * Peer dependencies required:
 *
 * brazil-build install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
 */

module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: ".",
  },
  rules: {
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error",
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": "error",
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": "warn",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-implicit-any-catch": [
      "error",
      {
        allowExplicitAny: false,
      },
    ],
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/unified-signatures": "warn",
  },
};
