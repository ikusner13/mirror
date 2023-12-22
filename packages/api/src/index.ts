/* eslint-disable n/no-process-exit */
import { initServer } from "./init-server";
import { logger } from "./logger";

const port = process.env["PORT"] ?? 5000;

initServer()
  .then((server) => {
    server.listen(port, () => {
      logger.info(`server listening on port ${port} 🚀`);
    });

    process.on("SIGTERM", () => {
      server.close((error) => {
        if (error) {
          logger.error("SIGTERM", error);
          process.exit(1);
        }

        logger.info("server closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      server.close((error) => {
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
