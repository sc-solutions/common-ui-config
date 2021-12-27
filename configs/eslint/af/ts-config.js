module.exports = {
  extends: ["../ts-config.js"],
  rules: {
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/member-delimiter-style": "warn",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase"],
      },
      {
        selector: ["function", "enumMember", "property"],
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "variable",
        modifiers: ["const"],
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "typeProperty",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
    ],
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
      },
    ],
  },
};
