import http from "http";

import { getEvents, getPhoto, getTrackLoop, getWeather } from "./modules";
import { createCronJob, createMessageJob } from "./scheduler";
import { createWebsocketServer } from "./socket-server";

const port = process.env["PORT"] ?? 3001;
const server = http.createServer();

const { sendEvent, shutdown, wss } = createWebsocketServer(server, {});

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

const weatherJob = createCronJob(
  () => sendEvent("weather", getWeather),
  `0 */${10} * * * *`,
);
const calendarJob = createCronJob(
  () => sendEvent("calendar", getEvents),
  `0 */${15} * * * *`,
);
const photoJob = createCronJob(
  () => sendEvent("photo", getPhoto),
  "0 0 * * * *",
);

const messageJob = createMessageJob({
  bedtimeTask: () => void sendEvent("message", () => "Goodnight!"),
  morningTask: () => void sendEvent("message", () => "Good morning!"),
});

// start cron jobs
weatherJob.start();
photoJob.start();
calendarJob.start();
messageJob.start();

// start spotify fetch loop
getTrackLoop((track) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ data: track, event: "spotify" }));
  });
});

process.on("SIGTERM", () => {
  shutdown();

  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  shutdown();

  server.close(() => {
    // log("closed server");
    process.exit(0);
  });
});
