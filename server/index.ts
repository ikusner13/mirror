/* eslint-disable n/no-process-exit */
import { initServer } from "./init-server";
import { logger } from "./logger";

initServer().catch((error) => {
  logger.error(error);

  process.exit(1);
});
