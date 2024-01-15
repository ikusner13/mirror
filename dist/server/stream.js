"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamManager = exports.StreamManager = exports.sendEvent = exports.createStream = void 0;
const stream_1 = require("stream");
const logger_1 = require("./logger");
const streamLogger = logger_1.logger.child({ module: "stream" });
function createStream(req, res) {
    res.writeHead(200, {
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
    });
    const stream = new stream_1.Readable({
        encoding: "utf-8",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        read() { },
    });
    stream.pipe(res);
    req.on("close", () => {
        stream.destroy();
    });
    return stream;
}
exports.createStream = createStream;
function sendEvent(stream, event, data) {
    stream.push(`event: ${event}\n`);
    stream.push(`data: ${data}\n\n`);
}
exports.sendEvent = sendEvent;
class StreamManager {
    streams;
    onConnectionCallbacks = [];
    constructor(streams = new Set()) {
        this.streams = streams;
    }
    addStream(stream) {
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
        streamLogger.info("Closing all streams");
        this.streams.forEach((stream) => {
            stream.destroy();
        });
        this.streams.clear();
    }
    onConnection(callback) {
        this.onConnectionCallbacks.push(callback);
    }
    sendEvent(event, data) {
        this.streams.forEach((stream) => {
            sendEvent(stream, event, data);
        });
    }
}
exports.StreamManager = StreamManager;
exports.streamManager = new StreamManager();
