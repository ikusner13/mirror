/* eslint-disable n/no-process-exit */
import * as fs from "node:fs";
import { type ServerResponse, createServer } from "node:http";
import enableDestroy from "server-destroy";

import { env } from "./env";
import { logger } from "./logger";
import {
  GoogleCalendar,
  GooglePhotos,
  Messages,
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
  const messages = new Messages(streamManager);

  // call init on modules
  await googleCredentialManager.init();

  await spotify.init();
  await googleCalendar.init();
  await googlePhotos.init();
  await weather.init();
  await messages.init();
  // start modules
  googleCalendar.start();
  googlePhotos.start();
  spotify.start();
  weather.start();
  messages.start();
}

function serveFile(res: ServerResponse, filePath: string, contentType: string) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
}

function configureServer(streamManager: StreamManager) {
  const server = createServer((req, res) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      `http://localhost:${env.CLIENT_PORT}`,
    );

    if (req.url === "/events") {
      const stream = createStream(req, res);
      streamManager.addStream(stream);
    } else if (req.url === "/") {
      serveFile(res, "./assets/index.html", "text/html");
    } else if (req.url?.endsWith(".woff")) {
      serveFile(res, `./assets${req.url}`, "font/woff");
    } else if (req.url?.endsWith(".ttf")) {
      serveFile(res, `./assets${req.url}`, "font/ttf");
    } else if (req.url?.endsWith(".css")) {
      serveFile(res, `./assets${req.url}`, "text/css");
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  enableDestroy(server);

  return server;
}

export async function initServer() {
  await initializeModules(streamManager).catch((error) => {
    logger.error(error);

    process.exit(1);
  });

  const server = configureServer(streamManager);

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

  return server;
}
