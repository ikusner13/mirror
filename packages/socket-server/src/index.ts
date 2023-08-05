import { WebSocketServer } from "ws";
import { Server as HTTPServer } from "http";
import {
  everyXSecondsJob,
  everyXMinutesJob,
  topOfTheHourJob,
} from "./schedules";

export function createWebsocketServer(
  server: HTTPServer,
  {
    onConnectionCb,
    onCloseCb,
  }: { onConnectionCb?: () => void; onCloseCb?: () => void },
) {
  const wss = new WebSocketServer({ server });

  const sendTestMessage = () => {
    console.log("CLIENTS", wss.clients.size);
    wss.clients.forEach((client) => {
      client.send("test message");
    });
  };

  const every5SecondsJob = everyXSecondsJob(sendTestMessage, 5);
  every5SecondsJob.start();

  const every10MinutesJob = everyXMinutesJob(sendTestMessage, 10);
  every10MinutesJob.start();

  const topOfTheHour = topOfTheHourJob(sendTestMessage);
  topOfTheHour.start();

  wss.on("connection", function connection(ws) {
    console.log("socket connected");
    ws.on("error", console.error);
  });

  wss.on("close", () => {
    console.log("socket closed");
  });

  const shutdown = () => {
    wss.clients.forEach((client) => {
      client.close();
    });

    wss.close(() => {
      console.log("closed socket");
    });

    every5SecondsJob.stop();
    every10MinutesJob.stop();
    topOfTheHour.stop();
  };

  return {
    shutdown,
    wss,
  };
}
