/* eslint-disable n/no-process-exit */
import { env } from "./env";
import { initServer } from "./init-server";
import { logger } from "./logger";

initServer()
  .then((server) => {
    server.listen(env.API_PORT, () => {
      logger.info(`server listening on port ${env.API_PORT} 🚀`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
