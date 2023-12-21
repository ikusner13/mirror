import { initServer } from "./init-server";
import { logger } from "./logger";

const port = process.env["PORT"] ?? 3001;

initServer()
  .then((server) => {
    server.listen(port, () => {
      logger.info(`server listening on port ${port} 🚀`);
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        throw new Error("server closed");
      });
    });

    process.on("SIGINT", () => {
      server.close(() => {
        throw new Error("server closed");
      });
    });
  })
  .catch((err) => {
    throw err;
  });
