module.exports = {
  "*": "prettier --write --ignore-unknown",
  "*.{js,ts}": "eslint --fix --max-warnings 0",
  "configs/**": "cspell --no-must-find-files",
  "*.md": "cspell --no-must-find-files",
  "README.md": "npm run readme-toc",
};
