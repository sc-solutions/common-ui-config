const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const del = require("rollup-plugin-delete");
const filesize = require("rollup-plugin-filesize");
const ttypescript = require("ttypescript");
const rootDir = require("../utils/rootDir");
const packageJson = require(path.resolve(rootDir, "package.json"));

/**
 * @typedef {Object} CustomOptions
 * @property {string[]} external - array of strings for packages which should not be bundled. By default this includes all dependencies, peerDependencies, and optionalDependencies listed in the package.json. If this option is set, this will completely override the default.
 * @property {boolean} noSourcemap - disable sourcemaps from the output
 * @property {boolean} noTypeDeclarations - disable TypeScript Type declarations from the output
 */

/**
 * @param srcSubfolder - If an empty string, will generate cjs, esm bundles from `src/index.ts`, if any other value will generate `cjs` bundles from `src/<srcSubfolder>/index.ts`
 * @param additionalPlugins - Array of rollup plugins to add
 * @param {CustomOptions} customOptions - Additional options which customize the behavior of the rollup config for special cases
 */
function buildConfig(
  srcSubfolder = "",
  additionalPlugins = [],
  customOptions = {}
) {
  // If someone passes this function to rollup directly, rollup will call the function and pass it an object as the first parameter.
  if (typeof srcSubfolder !== "string") {
    srcSubfolder = "";
  }

  const typescriptPluginConfig = {
    typescript: ttypescript,
    noEmitOnError: true,
    tsconfig: "./tsconfig.json",
    include: [path.join("./src", srcSubfolder, "**")],
    exclude: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.stories.ts",
      "**/*.stories.tsx",
    ],
    declaration: customOptions.noTypeDeclarations === true ? false : true,
    outDir: "",
    declarationDir: customOptions.noTypeDeclarations === true ? undefined : "",
    plugins: [
      { transform: "typescript-transform-paths" },
      { transform: "typescript-transform-paths", afterDeclarations: true },
    ],
  };

  const commonPlugins = [
    typescript(typescriptPluginConfig),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
      exclude: /node_modules/,
    }),
    json(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    filesize(),
  ];

  const externals = (() => {
    let pendingExternals = [
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {}),
      ...Object.keys(packageJson.optionalDependencies || {}),
    ];

    if (typeof customOptions.external !== "undefined") {
      // If `external` is defined but is not an array or is not an array of only strings, return it as-is. Rollup supports functions, regex arrays and much more so we can assume the caller is smart enough to want to use that advanced functionality.
      if (
        !Array.isArray(customOptions.external) ||
        !customOptions.external.every((item) => typeof item === "string")
      ) {
        return customOptions.external;
      }
      pendingExternals = customOptions.external;
    }
    // Convert array of strings to regex which will match any path that starts with that string.
    return pendingExternals.map((name) => new RegExp(`^${regexEscape(name)}`));
  })();

  const baseConfig = {
    input: path.join("./src", srcSubfolder, "index.ts"),
    external: externals,
  };

  // If this is specified, the package likely has multiple entry points so must be just cjs
  if (srcSubfolder !== "") {
    return [
      {
        ...baseConfig,
        output: {
          file: path.join("./", srcSubfolder, "index.js"),
          format: "cjs",
          sourcemap: customOptions.noSourcemap === true ? false : true,
          exports: "auto",
        },
        plugins: [
          del({
            targets: path.join("./", srcSubfolder),
          }),
          typescript(typescriptPluginConfig),
          ...commonPlugins,
          ...additionalPlugins,
        ],
      },
    ];
  }
  return [
    {
      ...baseConfig,
      output: {
        file: "./dist/cjs/index.js",
        format: "cjs",
        sourcemap: customOptions.noSourcemap === true ? false : true,
        exports: "auto",
      },
      plugins: [
        del({
          targets: "./dist/cjs",
        }),
        ...commonPlugins,
        ...additionalPlugins,
      ],
    },
    {
      ...baseConfig,
      output: {
        file: "./dist/esm/index.js",
        format: "esm",
        sourcemap: customOptions.noSourcemap === true ? false : true,
        exports: "auto",
      },
      plugins: [
        del({
          targets: "./dist/esm",
        }),
        ...commonPlugins,
        ...additionalPlugins,
      ],
    },
  ];
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = buildConfig;
