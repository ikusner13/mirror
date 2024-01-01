module.exports = {
  apps: [
    {
      cron_restart: "0 0 * * *",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      name: "server",
      script: "./build/index.js",
    },
    {
      args: "./main.mjs",
      env: {
        DISPLAY: ":0",
      },
      instances: 1,
      name: "electron-app",
      script: "electron",
    },
  ],
};
