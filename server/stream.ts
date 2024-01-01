import { EventEmitter } from "node:events";

import { logger } from "./logger";

const streamLogger = logger.child({ module: "stream" });

//TODO: event listeners on request signals?
export function createStream(_req: Request) {
  const stream = new ReadableStream({
    cancel(controller: ReadableStreamDefaultController) {
      streamLogger.info("Stream cancelled", controller);
      streamManager.removeAllListeners();
      controller.close();
    },
    // pull(controller) {},
    start(controller) {
      streamLogger.info("Stream started");
      streamManager.startup();
      streamManager.onEvent(controller);
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

  onEvent(controller: ReadableStreamDefaultController) {
    this.streamEventEmitter.on("event", ({ data, event }) => {
      controller.enqueue(`event: ${event}\n`);
      controller.enqueue(`data: ${data}\n\n`);
    });
  }

  removeAllListeners() {
    this.streamEventEmitter.removeAllListeners("event");
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
