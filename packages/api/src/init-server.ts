import http, { type Server as HTTPServer } from "http";

import { googleCredentialManager } from "./google-auth";
import {
  getPhoto,
  getUpcomingEvents,
  getWeather,
  spotifyManager,
} from "./modules";
import { createCronJob } from "./scheduler";
import { createWebsocketServer } from "./socket-server";

const initializeModules = async () => {
  // get credentials for google modules
  await googleCredentialManager.initialize();

  // get spotify credentials setup
  await spotifyManager.initialize();
};

const setupModuleEvents = (server: HTTPServer) => {
  const { sendEvent, wss } = createWebsocketServer(server, {});

  const weatherJob = createCronJob(
    () => sendEvent("weather", getWeather),
    `0 */${10} * * * *`,
  );
  const calendarJob = createCronJob(
    () => sendEvent("calendar", getUpcomingEvents),
    `0 */${15} * * * *`,
  );
  const photoJob = createCronJob(
    () => sendEvent("photo", getPhoto),
    "0 0 * * * *",
  );

  weatherJob.start();
  photoJob.start();
  calendarJob.start();

  spotifyManager.getTrackLoop((track) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ data: track, event: "spotify" }));
    });
  });
};

const initServer = async () => {
  const server = http.createServer();

  await initializeModules();

  setupModuleEvents(server);

  return server;
};

export { initServer };
