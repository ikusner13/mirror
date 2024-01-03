import pino from "pino";

import { env } from "./env";

const devLogger = pino({
  level: "debug",
  transport: {
    options: {
      colorize: true,
    },
    target: "pino-pretty",
  },
});

export const logger = env.NODE_ENV === "production" ? pino() : devLogger;
