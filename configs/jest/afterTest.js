const path = require("path");
const rootDir = require("../utils/rootDir");

function logCoveragePath() {
  const lcovHTMLPath = path.join(
    rootDir,
    "coverage",
    "lcov-report",
    "index.html"
  );
  const coveragePath = `./${path.relative(process.cwd(), lcovHTMLPath)}`;

  const message = `\x1b[93mView Detailed Coverage UI: \x1b[4m${coveragePath}\x1b[0m`;
  // Get the length of the message without the ANSI escape characters (the color codes)
  // eslint-disable-next-line no-control-regex
  const messageLength = message.replace(/\u001b\[[0-9]+m/g, "").length;
  const dashes = "-".repeat(messageLength);
  console.log(`\n${dashes}\n${message}\n${dashes}\n`);
}

module.exports = () => {
  logCoveragePath();
};
