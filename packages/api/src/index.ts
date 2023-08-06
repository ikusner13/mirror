import http from "http";

import { getEvents, getPhoto, getTrackLoop, getWeather } from "./modules";
import {
  everyXMinutesJob,
  morningAndBedtimeJob,
  topOfTheHourJob,
} from "./scheduler";
import { createWebsocketServer } from "./socket-server";

const port = process.env["PORT"] ?? 3001;
const server = http.createServer();

const { serveClients, shutdown } = createWebsocketServer(server, {});

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

const every10MinutesJob = everyXMinutesJob(() => {
  serveClients((ws) => {
    getWeather((weather) => {
      ws.send(
        JSON.stringify({
          data: weather,
          event: "weather",
        }),
      );
    });
  });
}, 10);

const every15MinutesJob = everyXMinutesJob(() => {
  serveClients((ws) => {
    getEvents((events) => {
      ws.send(
        JSON.stringify({
          data: events,
          event: "calendar",
        }),
      );
    });
  });
}, 15);

const everyHourJob = topOfTheHourJob(() => {
  serveClients((ws) => {
    getPhoto((photo) => {
      ws.send(
        JSON.stringify({
          data: photo,
          event: "photo",
        }),
      );
    });
  });
});

const morningAndBedtime = morningAndBedtimeJob({
  bedtimeTask: () => {
    serveClients((ws) => {
      ws.send("bedtime");
    });
  },
  morningTask: () => {
    serveClients((ws) => {
      ws.send("morning");
    });
  },
});

// start cron jobs
every10MinutesJob.start();
everyHourJob.start();
morningAndBedtime.start();
every15MinutesJob.start();

// start spotify fetch loop
getTrackLoop((track) => {
  serveClients((ws) => {
    ws.send(
      JSON.stringify({
        data: track,
        event: "spotify",
      }),
    );
  });
});

process.on("SIGTERM", () => {
  shutdown();

  every10MinutesJob.stop();
  everyHourJob.stop();
  morningAndBedtime.stop();
  every15MinutesJob.stop();

  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  shutdown();

  every10MinutesJob.stop();
  everyHourJob.stop();
  morningAndBedtime.stop();

  server.close(() => {
    // log("closed server");
    process.exit(0);
  });
});
