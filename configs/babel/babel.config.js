module.exports = (api) => {
  const isTest = api.env("test");
  let additionalBabelEnvConfigs = {};
  if (isTest) {
    additionalBabelEnvConfigs = {
      targets: {
        node: "current",
      },
    };
  }
  return {
    plugins: ["emotion"],
    presets: [
      [
        "@babel/env",
        {
          bugfixes: true,
          useBuiltIns: "usage",
          corejs: 3,
          shippedProposals: true,
          ...additionalBabelEnvConfigs,
        },
      ],
      [
        "@babel/react",
        {
          useBuiltIns: true,
          runtime: "automatic",
        },
      ],
      [
        "@babel/typescript",
        {
          allowDeclareFields: true,
          onlyRemoveTypeImports: true,
        },
      ],
    ],
  };
};
