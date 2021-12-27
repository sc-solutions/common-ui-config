# Modular ESLint

The default rule configuration pre-configures many rules and plugins for use with a React/TypeScript/Jest/Storybook front-end package. This is a fairly general configuration which can be used for many other package types also including CDK, Node, and more. If your package doesn't need all of these plugins or needs to remove and replace a plugin with a different one (eg: swap Jest for Cypress) you can build a config from the modular pieces provided by this package!

## Extending/Overriding

The core of the modular config is one config extending another. See the [index.js](index.js) file in this folder as an example of how the main config is composed of many smaller configs. Any configs which should apply to all files are extended at the top level of the config. Any configs which apply to only a certain file format are listed in the overrides array.

All of the modular configs available can be found in this folder with the suffix `-config.js` on their file name.

Due to an issue with ESLint loading nested shared configuration files, whenever you want to extend a config, you must use the following syntax in the `extends` array:

```js
require.resolve(
  "@sc-solutions/common-ui-config/configs/eslint/{CONFIG_NAME_HERE}"
);
```

## Peer Dependencies

When using a custom modular config, you likely won't need all of the peerDependencies listed in the README. The necessary dependencies for each modular config are listed in a comment at the top of that file in this folder. Just open each of the configs that you are extending and copy the command to install its required dependencies.

## Base Example

At a minimum, all configs should extend the base `js-config` which provides the foundational ESLint rules and ESLint configuration.

```js
/* eslint-env node */

module.exports = {
  extends: [
    require.resolve("@sc-solutions/common-ui-config/configs/eslint/js-config"),
  ],
};
```

## Other Examples

### TypeScript & Jest (No React)

```js
/* eslint-env node */

module.exports = {
  extends: [
    require.resolve("@sc-solutions/common-ui-config/configs/eslint/js-config"),
  ],
  overrides: [
    {
      extends: [
        require.resolve(
          "@sc-solutions/common-ui-config/configs/eslint/ts-config"
        ),
      ],
      files: ["*.ts"],
    },
    {
      extends: [
        require.resolve(
          "@sc-solutions/common-ui-config/configs/eslint/jest-config"
        ),
      ],
      files: ["*.test.ts"],
    },
  ],
};
```

### Cypress Integration Tests

```js
/* eslint-env node */

module.exports = {
  extends: [
    require.resolve("@sc-solutions/common-ui-config/configs/eslint/js-config"),
  ],
  overrides: [
    {
      extends: [
        require.resolve(
          "@sc-solutions/common-ui-config/configs/eslint/ts-config"
        ),
      ],
      files: ["*.ts"],
    },
    {
      extends: [
        require.resolve(
          "@sc-solutions/common-ui-config/configs/eslint/cypress-config"
        ),
      ],
      files: ["*.spec.js", "*.spec.ts"],
    },
  ],
};
```

### React UI (No tests)

```js
/* eslint-env node */

module.exports = {
  extends: [
    require.resolve("@sc-solutions/common-ui-config/configs/eslint/js-config"),
    require.resolve(
      "@sc-solutions/common-ui-config/configs/eslint/react-global-config"
    ),
  ],
};
```
