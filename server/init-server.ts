/* eslint-disable n/no-process-exit */
import * as fs from "node:fs";
import { createServer } from "node:http";
import * as path from "node:path";

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
  const server = createServer((req, res) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      `http://localhost:${env.CLIENT_PORT}`,
    );

    if (req.url === "/events") {
      const stream = createStream(req, res);
      streamManager.addStream(stream);
    } else if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      const file = fs.createReadStream(
        path.join(process.cwd(), "./assets/index.html"),
      );

      file.pipe(res);
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  return server;
}

export async function initServer() {
  await initializeModules(streamManager).catch((error) => {
    logger.error(error);

    process.exit(1);
  });
  const server = configureServer(streamManager);

  return server;
}
