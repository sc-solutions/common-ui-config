# Common UI Config - `@sc-solutions/common-ui-config`

## Table of Contents

- [About](#about)
- [Usage](#usage)
  - [General](#general)
  - [Webpack](#webpack)
  - [Storybook](#storybook)
  - [Babel](#babel)
  - [Postcss](#postcss)
  - [TypeScript](#typescript)
  - [Jest](#jest)
  - [Prettier](#prettier)
  - [ESLint](#eslint)
  - [Rollup Library](#rollup-library)
  - [npm-check-updates](#npm-check-updates)
- [Not Included Configs](#not-included-configs)
  - [Browserslist](#browserslist)

## About

This package contains modular configs for many tools that are used across packages. Each one can be independently included and can easily be overwritten with your own custom config as needed.

By using this package, you'll get pre-configured configs but also updates if/when things change. Each config is "batteries included" and works out of the box with little setup. But each is designed to be easy to override or extend if you wish. **Check out the source of this package to see more details about the provided configs.**

The integration with each tool is a bit different. Below are examples for using each of the configs this package provides. All of the configs are designed to be used together so if you choose to not take all of them or use them in a different way, there will likely need to be overrides to make them work.

## Usage

### Webpack

This supports absolute imports for the `src` folder with `~/`. This expects an entry point at `src/index` and a remote entry for loading your routes in the shell located at `src/Routes`.
**NOTE**: You must also use the [TypeScript](#typescript) and [Babel](#babel) configs.

#### Required peer dependencies:

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server@4.0.0-beta.3 babel-loader cookie-parser css-loader css-minimizer-webpack-plugin dotenv fork-ts-checker-webpack-plugin html-webpack-plugin mini-css-extract-plugin mini-svg-data-uri postcss postcss-loader sass sass-loader terser-webpack-plugin webpack webpack-bundle-analyzer webpack-merge node-polyfill-webpack-plugin
```

#### Custom Configuration Options

- `port`: Port number that the webpack-dev-server uses to host the local development server. \[Default `5000`]
- `appName`: Unique name for your project which will be used as the folder name in the shared S3 bucket and the name of your remote module for ModuleFederation.
- `exposes`: A list of paths to files in your project which will be exposed by ModuleFederation to be loaded by another app. \[Default `undefined`]
- `remoteModules`: An object mapping remote module names to the path of their `remoteEntry.js` file. Used for loading files that another project listed in their `exposes` configuration. \[Default `undefined`]

#### Example

**webpack.config.js**

```js
/* eslint-env node */

const commonConfig = require("@sc-solutions/common-ui-config/configs/webpack");
const { merge: webpackMerge } = require("webpack-merge");

module.exports = function (env = {}, argv = {}) {
  // Put your webpack config here which then will intelligently merge with the common config.
  const customConfig = {};
  const commonConfigOptions = {
    exposes: ["./Routes"],
  };
  return webpackMerge(
    commonConfig(env, argv, commonConfigOptions),
    customConfig
  );
};
```

### Storybook

**NOTE**: You must also use the [Webpack](#webpack) config.

#### Required peer dependencies:

```sh
npm install --save-dev @storybook/react @storybook/addon-a11y @storybook/addon-essentials @storybook/addon-links @storybook/builder-webpack5 @storybook/manager-webpack5 dotenv-webpack node-polyfill-webpack-plugin
```

#### Example

The example below requires installing [deepmerge](https://www.npmjs.com/package/deepmerge) as a devDependency.

**.storybook/main.js**

```js
/* eslint-env node */

const commonConfig = require("@sc-solutions/common-ui-config/configs/storybook/main");
const merge = require("deepmerge");

// Put your storybook config here which then will merge with the common config.
const customConfig = {};

module.exports = merge(commonConfig, customConfig);
```

**.storybook/middleware.js**

```js
/* eslint-env node */

const afCommonMiddleware = require("@sc-solutions/common-ui-config/configs/storybook/middleware");

module.exports = afCommonMiddleware;
```

### Babel

**NOTE**: You must also use the [browserslist](#browserslist) config.

#### Required peer dependencies:

```sh
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-plugin-emotion@10 core-js
```

#### Example

**babel.config.js**

```js
/* eslint-env node */

module.exports = {
  extends: "@sc-solutions/common-ui-config/configs/babel",
};
```

### Postcss

#### Required peer dependencies:

```sh
npm install --save-dev postcss postcss-preset-env
```

#### Example

The example below requires installing [deepmerge](https://www.npmjs.com/package/deepmerge) as a devDependency.

**postcss.config.js**

```js
/* eslint-env node */

const commonConfig = require("@sc-solutions/common-ui-config/configs/postcss");
const merge = require("deepmerge");

// Put your postcss config here which then will merge with the common config.
const customConfig = {};

module.exports = merge(commonConfig, customConfig);
```

### TypeScript

This supports absolute imports for the `src` folder with `~/` and the `tst` folder with `tst/`. You'll need to use the Webpack config also to enable full support.

Note: This config has the compilerOption `noEmit: true` as this is intended to be used just for typechecking and not transpilation. ([Babel](#babel) should be used instead.) If you wish to use TypeScript to transpile your code or emit Type declarations, you'll need to set `noEmit: false` and enable the other compilerOptions options as necessary.

#### Required peer dependencies:

```sh
npm install --save-dev typescript
```

#### Example

**tsconfig.json**

```json
{
  "extends": "@sc-solutions/common-ui-config/configs/typescript",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src", "tst"]
}
```

### Jest

This supports absolute imports for the `src` folder with `~/` and the `tst` folder with `tst/`. You'll need to use the Webpack and TypeScript configs also to enable full support. To transpile your code, this uses Babel by default so you'll need to use the Babel config also.

**NOTE**: You must also use the [Babel](#babel) config.

#### Required peer dependencies:

```sh
npm install --save-dev @types/jest jest identity-obj-proxy
```

#### Example

The example below requires installing [deepmerge](https://www.npmjs.com/package/deepmerge) as a devDependency.

**jest.config.js**

```js
/* eslint-env node */

const commonConfig = require("@sc-solutions/common-ui-config/configs/jest");
const merge = require("deepmerge");

// Put your jest config here which then will merge with the common config.
const customConfig = {};

module.exports = merge(commonConfig, customConfig);
```

### Prettier

#### Required peer dependencies:

```sh
npm install --save-dev prettier
```

#### Example

**prettier.config.js**

```js
/* eslint-env node */

const commonConfig = require("@sc-solutions/common-ui-config/configs/prettier");

module.exports = {
  ...commonConfig,
  // Put your prettier config here which then will override the common config.
};
```

### ESLint

This config supports different rules by file extension (eg: js, ts, tsx, .test.tsx, etc). Refer check out the config details in this package for more details.

Refer to the [ESLint extending sharable config](https://eslint.org/docs/user-guide/configuring/configuration-files#using-a-shareable-configuration-package) doc for overriding/extending this shared config.

When running ESLint, be sure to add `--max-warnings 0` to treat warnings as errors. Warnings indicate the severity for the developer to fix during development but both warnings and errors should be fixed before merging.

Note: The underlying ESLint configs are modular so you can pick just the configs that are relevant to your package. See [MODULAR_ESLINT.md](configs/eslint/MODULAR_ESLINT.md) for more details and usage instructions.

#### Required peer dependencies:

```sh
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript @babel/eslint-parser @babel/core eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-testing-library
```

#### Example

**.eslintrc.js**

```js
/* eslint-env node */

module.exports = {
  extends: [require.resolve("@sc-solutions/common-ui-config/configs/eslint")],
};
```

### Rollup Library

Use this config to bundle TypeScript libraries which will be consumed by another package or run directly in Node.js.

For advanced use-cases, see the the [rollup.config.js source](configs/rollup/rollup.config.js) for additional arguments to customize the bundling behavior.

**NOTE**: You must also use the [TypeScript](#typescript) and [Babel](#babel) configs.

#### Required peer dependencies:

```sh
npm install --save-dev rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript @rollup/plugin-json rollup-plugin-delete rollup-plugin-filesize ttypescript typescript-transform-paths tslib
```

#### Example

**package.json**

Package artifacts: (Include these to tell consuming packages how to import/bundle)

```json
"files": [
    "dist"
],
"main": "dist/cjs/index.js",
"module": "dist/esm/index.js",
"types": "dist/esm/index.d.ts",
"sideEffects": false,
```

**rollup.config.js**

```js
import rollupConfig from "@sc-solutions/common-ui-config/configs/rollup";

export default rollupConfig;
```

**Or if you have a package with multiple entry points:**

For example, if your `package.json`'s `"files"` array contains `["folder1"]`, the entry point will be `src/folder1/index.ts` and the output will be `folder1/index.js`.

Note by creating multiple entry points, you cannot use the `main`, `module` and `types` fields from the `package.json` section above. Also, each entry point will not be tree-shakable.

```js
import rollupConfig from "@sc-solutions/common-ui-config/configs/rollup";
import packageJson from "./package.json";

// To add a new folder to export, add it to the "files" array in package.json
// Also add the new folder to .gitignore
export default packageJson.files
  .map((exportName) => {
    return rollupConfig(exportName);
  })
  .flat();
```

Or manual entry points:

```js
import rollupConfig from "@sc-solutions/common-ui-config/configs/rollup";

export default [...rollupConfig("folder1"), ...rollupConfig("folder2")];
```

**Or if you want to add additional rollup plugins:**

```js
import rollupConfig from "@sc-solutions/common-ui-config/configs/rollup";

export default rollupConfig("", [myPlugin(), anotherPlugin()]);
```

### npm-check-updates

This includes configurations for [npm-check-updates](https://github.com/raineorshine/npm-check-updates).

Add the following npm scripts to your `package.json` file:

```json
    "list-outdated-dependencies": "npm-check-updates --format repo --peer",
    "update-dependencies": "npm-check-updates --peer -u && npm install && npm run release",
    "update-dependencies-doctor": "npm-check-updates --doctor --peer -u"
```

- Run `bb run list-outdated-dependencies` which will list all packages that are outdated with a link to the repo where you can find the changelog or release notes.
- Run `bb run update-dependencies` which will update and install new packages. Make any changes as found in previous step. Rebuild to ensure everything still works.
- If there is an issue, and it's not clear what package is causing it, roll back all changes and use the `bb run update-dependencies-doctor` command which will update each dependency one at a time and re-run `bb run test` automatically after each one to see which ones fail.

#### Required peer dependencies:

```sh
npm install --save-dev npm-check-updates
```

#### Example

The example below requires installing [deepmerge](https://www.npmjs.com/package/deepmerge) as a devDependency.

**.ncurc.js**

```js
/* eslint-env node */

const commonConfig = require("@sc-solutions/common-ui-config/configs/ncu");
const merge = require("deepmerge");

// Put your npm-check-updates config here which then will merge with the common config.
const customConfig = {};

module.exports = merge(commonConfig, customConfig);
```

## Not Included Configs

Some configs could not be centralized. As such, the config will need to be copied manually.

### Browserslist

This browser list is used by any tool that needs to consider browser support for transpiling or polyfilling such as [Babel](#babel), for example. For additional information regarding formatting, rule options, and other tools that utilize browserslist, refer to [Browserslist docs](https://github.com/browserslist/browserslist)

Create a file named `.browserslistrc` and include the following content.

```txt
# Browser support for Aamazon Frieght.

last 1 Chrome major versions
last 1 Firefox major versions
last 1 Edge major versions
last 1 Safari major versions
last 1 iOS major versions
last 1 ChromeAndroid major versions
```
