/* eslint-disable n/no-process-exit */
import { env } from "./env";
import { initServer } from "./init-server";
import { logger } from "./logger";
import { streamManager } from "./stream";

initServer()
  .then((server) => {
    server.listen(env.API_PORT, () => {
      logger.info(`server listening on port ${env.API_PORT} 🚀`);
    });

    process.on("SIGTERM", () => {
      server.destroy((error) => {
        streamManager.closeAllStreams();
        if (error) {
          logger.error("SIGTERM", error);
          process.exit(1);
        }

        logger.info("server closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      streamManager.closeAllStreams();
      server.destroy((error) => {
        if (error) {
          logger.error("SIGINT", error);
          process.exit(1);
        }

        logger.info("server closed");
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
