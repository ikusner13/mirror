import { initServer } from "./init-server";

const port = process.env["PORT"] ?? 3001;

initServer()
  .then((server) => {
    server.listen(port, () => {
      console.log(`api running on ${port}`);
    });

    // start spotify fetch loop

    process.on("SIGTERM", () => {
      server.close(() => {
        throw new Error("server closed");
      });
    });

    process.on("SIGINT", () => {
      server.close(() => {
        throw new Error("server closed");
      });
    });
  })
  .catch((err) => {
    throw err;
  });
