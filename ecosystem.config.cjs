require("dotenv").config();

module.exports = {
  apps: [
    {
      // cron_restart: "0 0 * * *",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      interpreter: "~/.bun/bin/bun",
      name: "server",
      script: "./build/index.js",
    },
    {
      env: {
        DISPLAY: ":0",
      },
      instances: 1,
      name: "client",
      script: "bun run electron",
    },
  ],
};
