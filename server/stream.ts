// import EventEmitter from "node:events";

import { EventEmitter } from "node:events";

import { logger } from "./logger";

const streamLogger = logger.child({ module: "stream" });

export function createStream(streamManager: StreamManager) {
  const stream = new ReadableStream({
    cancel(controller: ReadableStreamDefaultController) {
      streamLogger.info("Stream cancelled", controller);
      streamManager.eventEmitter.removeAllListeners("event");
      controller.close();
    },
    // pull(controller) {},
    start(controller) {
      streamLogger.info("Stream started");
      streamManager.startup();
      streamManager.eventEmitter.on("event", ({ data, event }) => {
        controller.enqueue(`event: ${event}\n`);
        controller.enqueue(`data: ${data}\n\n`);
      });
    },
  });

  return stream;
}

export class StreamManager {
  constructor(
    private onConnectionCallbacks: (() => Promise<void>)[] = [],
    private streamEventEmitter: EventEmitter = new EventEmitter(),
  ) {}

  onConnection(callback: () => Promise<void>) {
    this.onConnectionCallbacks.push(callback);
  }

  sendEvent(event: string, data: string) {
    this.streamEventEmitter.emit("event", { data, event });
  }

  startup() {
    Promise.all(this.onConnectionCallbacks.map((cb) => cb())).catch((error) => {
      streamLogger.error(error);
    });
  }

  get eventEmitter() {
    return this.streamEventEmitter;
  }
}

export const streamManager = new StreamManager();
