/**
 * Peer dependencies required:
 *
 * brazil-build install --save-dev @babel/core @babel/eslint-parser eslint-plugin-import
 */

module.exports = {
  plugins: ["import"],
  extends: ["eslint:recommended"],
  env: {
    es6: true,
    browser: true,
  },
  reportUnusedDisableDirectives: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    requireConfigFile: false,
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {
    "no-loss-of-precision": "error",
    "no-template-curly-in-string": "error",
    "no-unsafe-optional-chaining": "error",
    "array-callback-return": "error",
    "consistent-return": "error",
    curly: "warn",
    "default-param-last": "error",
    eqeqeq: "error",
    "no-constructor-return": "error",
    "no-empty-function": "warn",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-proto": "error",
    "no-return-assign": "warn",
    "no-script-url": "error",
    "no-self-compare": "warn",
    "no-sequences": "warn",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "warn",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "warn",
    "prefer-promise-reject-errors": "error",
    radix: "error",
    "require-await": "error",
    "wrap-iife": ["warn", "inside"],
    "no-shadow": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-multi-assign": "warn",
    "no-new-object": "error",
    "no-useless-computed-key": "warn",
    "no-useless-rename": "warn",
    "no-var": "error",
    "prefer-const": "warn",
    "prefer-numeric-literals": "warn",
    "prefer-object-spread": "warn",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    "import/no-duplicates": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          ["parent", "sibling", "internal", "index"],
        ],
        pathGroups: [
          {
            pattern: "~/**",
            group: "internal",
          },
          {
            pattern: "tst/**",
            group: "internal",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
  },
};