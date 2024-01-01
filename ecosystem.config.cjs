module.exports = {
  apps: [
    {
      name: "server",
      script: "./build/index.js",
    },
    {
      args: "./main.mjs",
      name: "electron-app",
      script: "electron",
    },
  ],
};
