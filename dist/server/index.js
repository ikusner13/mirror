"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable n/no-process-exit */
const env_1 = require("./env");
const init_server_1 = require("./init-server");
const logger_1 = require("./logger");
(0, init_server_1.initServer)()
    .then((server) => {
    server.listen(env_1.env.API_PORT, () => {
        logger_1.logger.info(`server listening on port ${env_1.env.API_PORT} 🚀`);
    });
})
    .catch((err) => {
    logger_1.logger.error(err);
    process.exit(1);
});
