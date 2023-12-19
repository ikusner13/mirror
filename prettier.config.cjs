/** @typedef  {import("prettier").Config} PrettierConfig*/

/** @type { PrettierConfig} */
const config = {
  arrowParens: "always",
  jsxSingleQuote: false,
  pluginSearchDirs: false,
  plugins: [require.resolve("prettier-plugin-packagejson")],
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
};

module.exports = config;
