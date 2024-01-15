"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const env_1 = require("./env");
const init_server_1 = require("./init-server");
const logger_1 = require("./logger");
async function startServer() {
    const server = await (0, init_server_1.initServer)();
    server.listen(env_1.env.API_PORT, () => {
        logger_1.logger.info(`Server listening on port ${env_1.env.API_PORT}`);
    });
    return server;
}
exports.startServer = startServer;
