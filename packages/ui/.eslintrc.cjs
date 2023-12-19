module.exports = {
  root: true,
  extends: ["mirror/base", "mirror/svelte"],
  parserOptions: {
    extraFileExtensions: [".svelte"],
    project: "./tsconfig.json",
  },
};
