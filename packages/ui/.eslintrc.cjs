module.exports = {
  extends: ["mirror/svelte"],
  // ignorePatterns: ["*.cjs"],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  parserOptions: {
    extraFileExtensions: [".svelte"],
    project: "tsconfig.json",
  },
};
