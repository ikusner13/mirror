/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:n/recommended"],
  rules: {
    "n/no-missing-import": "off",
  },
};

module.exports = config;
