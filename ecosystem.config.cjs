module.exports = {
  apps: [
    {
      env: {
        NODE_ENV: "production",
      },
      name: "server",
      script: "./build/index.js",
    },
    {
      args: "./main.mjs",
      env: {
        DISPLAY: ":0",
      },
      name: "electron-app",
      script: "electron",
    },
  ],
};
