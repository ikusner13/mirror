import http from "http";
import { createWebsocketServer } from "socket-server";
import { log } from "logger";

const port = process.env.PORT || 3001;
const server = http.createServer();

const { shutdown, wss } = createWebsocketServer(server);

server.listen(port, () => {
  log(`api running on ${port}`);
});

process.on("SIGTERM", () => {
  shutdown();

  server.close(() => {
    // log("closed server");
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
