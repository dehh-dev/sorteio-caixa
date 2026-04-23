export default {
  root: true,
  env: { browser: true, es2024: true },
  extends: ["eslint:recommended"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {},
  ignorePatterns: ["node_modules/", "dist/", "data/*"],
};
