const path = require("path");

module.exports = {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "src/**/*.js",
    "src/**/*.jsx",
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", ".stories.[tj]s?(x)$"],
  coverageReporters: ["cobertura", "text", "text-summary", "lcov"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  errorOnDeprecated: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      path.resolve(__dirname, "mocks/fileMock.js"),
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "tst/(.*)$": "<rootDir>/tst/$1",
    "~/(.*)$": "<rootDir>/src/$1",
  },
  timers: "fake",
  verbose: true,
  testEnvironment: "jsdom",
  globalTeardown: path.resolve(__dirname, "afterTest.js"),
};
