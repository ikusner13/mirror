/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:perfectionist/recommended-natural",
    "plugin:n/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "**/.eslintrc.cjs",
    "packages/config/**",
    "dist",
    "pnpm-lock.yaml",
  ],
  overrides: [
    {
      files: ["**/*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "n/no-missing-import": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      { blankLine: "always", next: "*", prev: "block-like" },
    ],
    "no-console": "warn",
    "perfectionist/sort-objects": [
      "error",
      {
        order: "asc",
        "partition-by-comment": true,
        type: "natural",
      },
    ],
  },
};

module.exports = config;
