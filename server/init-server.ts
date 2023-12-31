/* eslint-disable n/no-process-exit */
import { env } from "./env";
import { logger } from "./logger";
import {
  GoogleCalendar,
  GooglePhotos,
  SpotifyManager,
  Weather,
} from "./modules";
import { GoogleCredentialManager } from "./modules/google-auth";
import { type StreamManager, createStream, streamManager } from "./stream";

async function initializeModules(streamManager: StreamManager) {
  const googleCredentialManager = new GoogleCredentialManager();

  // instantiate modules
  const googleCalendar = new GoogleCalendar(
    streamManager,
    googleCredentialManager,
  );
  const googlePhotos = new GooglePhotos(streamManager, googleCredentialManager);
  const spotify = new SpotifyManager(streamManager);
  const weather = new Weather(streamManager);

  // call init on modules
  await googleCredentialManager.init();

  await spotify.init();
  await googleCalendar.init();
  await googlePhotos.init();
  await weather.init();

  // start modules
  googleCalendar.start();
  googlePhotos.start();
  spotify.start();
  weather.start();
}

function configureServer(streamManager: StreamManager) {
  const server = Bun.serve({
    fetch(request, _server) {
      const url = new URL(request.url);
      const path = url.pathname;

      if (path === "/") {
        return new Response(Bun.file("./assets/index.html"), {
          headers: {
            "Content-Type": "text/html",
          },
          status: 200,
        });
      } else if (path === "/events") {
        return new Response(createStream(streamManager), {
          headers: {
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
          },
          status: 200,
        });
      }

      return new Response("Not found", {
        status: 404,
      });
    },
    port: env.API_PORT,
  });

  logger.info(`server is listening on ${server.hostname}:${server.port}`);
}

export async function initServer() {
  await initializeModules(streamManager).catch((error) => {
    logger.error(error);

    process.exit(1);
  });
  configureServer(streamManager);
}
