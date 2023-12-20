import { type Server as HTTPServer, createServer } from "http";

import { googleCredentialManager } from "./google-auth";
import {
  getPhoto,
  getUpcomingEvents,
  getWeather,
  spotifyManager,
} from "./modules";
import { createCronJob } from "./scheduler";
import { StreamManager, createStream } from "./stream";

const initializeModules = async () => {
  // get credentials for google modules
  await googleCredentialManager.initialize();

  // get spotify credentials setup
  await spotifyManager.initialize();
};

const setupModuleEvents = (streamManager: StreamManager) => {
  const weatherJob = createCronJob(async () => {
    const weather = await getWeather();

    streamManager.sendEvent("weather", JSON.stringify(weather));
  }, `0 */${10} * * * *`);

  const calendarJob = createCronJob(async () => {
    const events = await getUpcomingEvents();

    streamManager.sendEvent("calendar", JSON.stringify(events));
  }, `0 */${15} * * * *`);

  const photoJob = createCronJob(async () => {
    const photo = await getPhoto();

    streamManager.sendEvent("photo", JSON.stringify(photo));
  }, "0 0 * * * *");

  weatherJob.start();
  photoJob.start();
  calendarJob.start();

  spotifyManager.getTrackLoop((track) => {
    streamManager.sendEvent("spotify", JSON.stringify(track));
  });
};

export const initServer = async (): Promise<HTTPServer> => {
  const streamManager = new StreamManager();
  await initializeModules();
  const server = configureServer(streamManager);

  return server;
};

const configureServer = (streamManager: StreamManager): HTTPServer => {
  const server = createServer((req, res) => {
    if (req.url === "/events") {
      const stream = createStream(req, res);
      streamManager.addStream(stream);
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  setupModuleEvents(streamManager);

  return server;
};
