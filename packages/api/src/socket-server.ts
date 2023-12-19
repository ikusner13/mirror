import { type Server as HTTPServer } from "http";
import { WebSocketServer } from "ws";

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

  process.on("SIGINT", () => {
    shutdown();
  });

  process.on("SIGTERM", () => {
    shutdown();
  });

  const sendEvent = async <T>(
    event: string,
    data: (() => Promise<T>) | string,
  ) => {
    if (typeof data === "string") {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ data, event }));
      });
      return;
    }

    try {
      const dataToSend = await data();

      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ data: dataToSend, event }));
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    sendEvent,
    shutdown,
    wss,
  };
}
