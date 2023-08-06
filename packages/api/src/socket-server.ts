import { type Server as HTTPServer } from "http";
import { type WebSocket, WebSocketServer } from "ws";

export function createWebsocketServer(
  server: HTTPServer,
  {
    onCloseCb,
    onConnectionCb,
  }: { onCloseCb?: () => void; onConnectionCb?: () => void },
) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", function connection(ws) {
    console.log("socket connected");
    onConnectionCb?.();
    ws.on("error", console.error);
  });

  wss.on("close", () => {
    console.log("socket closed");
    onCloseCb?.();
  });

  const shutdown = () => {
    wss.clients.forEach((client) => {
      client.close();
    });

    wss.close(() => {
      console.log("closed socket");
    });
  };

  const serveClients = (cb: (ws: WebSocket) => void) => {
    wss.clients.forEach((client) => {
      cb(client);
    });
  };

  return {
    serveClients,
    shutdown,
    wss,
  };
}
