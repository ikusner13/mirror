import { type IncomingMessage, type ServerResponse } from "http";
import { Readable } from "stream";

import { logger } from "./logger";

const streamLogger = logger.child({ module: "stream" });

export function createStream(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const stream = new Readable({
    encoding: "utf-8",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    read() {},
  });

  stream.pipe(res);

  req.on("close", () => {
    stream.destroy();
  });

  return stream;
}

export function sendEvent(stream: Readable, event: string, data: string) {
  stream.push(`event: ${event}\n`);
  stream.push(`data: ${data}\n\n`);
}

export class StreamManager {
  onConnectionCallbacks: (() => Promise<void>)[] = [];
  constructor(private streams: Set<Readable> = new Set()) {}

  addStream(stream: Readable) {
    streamLogger.info("New stream connected", stream);
    this.streams.add(stream);

    Promise.all(this.onConnectionCallbacks.map((cb) => cb())).catch((error) => {
      streamLogger.error(error);
    });

    stream.on("close", () => {
      streamLogger.info("Stream closed", stream);
      this.streams.delete(stream);
    });

    stream.on("error", (error) => {
      streamLogger.error(error);

      stream.destroy();
    });
  }

  closeAllStreams() {
    this.streams.forEach((stream) => {
      stream.destroy();
    });

    this.streams.clear();
  }

  onConnection(callback: () => Promise<void>) {
    this.onConnectionCallbacks.push(callback);
  }

  sendEvent(event: string, data: string) {
    this.streams.forEach((stream) => {
      sendEvent(stream, event, data);
    });
  }
}

export const streamManager = new StreamManager();

process.on("uncaughtException", (error) => {
  streamLogger.error(error);
});

process.on("unhandledRejection", (reason) => {
  streamLogger.error(reason);
});

process.on("SIGTERM", () => {
  streamLogger.info("SIGTERM");
  streamManager.closeAllStreams();
});

process.on("SIGINT", () => {
  streamLogger.info("SIGINT");
  streamManager.closeAllStreams();
});
