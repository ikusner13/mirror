module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["mirror/base"],
  parserOptions: {
    ecmaVersion: "latest",
    project: [
      "./tsconfig.json",
      "./packages/ui/tsconfig.json",
      "./packages/api/tsconfig.json",
    ],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
};
