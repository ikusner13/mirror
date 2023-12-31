import pino from "pino";

import { env } from "./env";

const transport =
  env.NODE_ENV === "development"
    ? {
        options: {
          colorize: true,
        },
        target: "pino-pretty",
      }
    : undefined;

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport,
});
