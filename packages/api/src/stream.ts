import { type IncomingMessage, type ServerResponse } from "http";
import { Readable } from "stream";

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
