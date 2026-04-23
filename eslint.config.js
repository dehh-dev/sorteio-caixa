const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    rules: {},
    ignores: ["node_modules/", "dist/", "data/*"],
  },
];
