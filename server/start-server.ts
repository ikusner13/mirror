import { env } from "./env";
import { initServer } from "./init-server";
import { logger } from "./logger";

export async function startServer() {
  const server = await initServer();

  server.listen(env.API_PORT, () => {
    logger.info(`Server listening on port ${env.API_PORT}`);
  });

  return server;
}
