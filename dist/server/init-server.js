"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
/* eslint-disable n/no-process-exit */
const fs = __importStar(require("node:fs"));
const node_http_1 = require("node:http");
const path = __importStar(require("node:path"));
const server_destroy_1 = __importDefault(require("server-destroy"));
const env_1 = require("./env");
const logger_1 = require("./logger");
const modules_1 = require("./modules");
const google_auth_1 = require("./modules/google-auth");
const stream_1 = require("./stream");
async function initializeModules(streamManager) {
    const googleCredentialManager = new google_auth_1.GoogleCredentialManager();
    // instantiate modules
    const googleCalendar = new modules_1.GoogleCalendar(streamManager, googleCredentialManager);
    const googlePhotos = new modules_1.GooglePhotos(streamManager, googleCredentialManager);
    const spotify = new modules_1.SpotifyManager(streamManager);
    const weather = new modules_1.Weather(streamManager);
    const messages = new modules_1.Messages(streamManager);
    // call init on modules
    await googleCredentialManager.init();
    await spotify.init();
    await googleCalendar.init();
    await googlePhotos.init();
    await weather.init();
    await messages.init();
    // start modules
    googleCalendar.start();
    googlePhotos.start();
    spotify.start();
    weather.start();
    messages.start();
}
function configureServer(streamManager) {
    const server = (0, node_http_1.createServer)((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", `http://localhost:${env_1.env.CLIENT_PORT}`);
        if (req.url === "/events") {
            const stream = (0, stream_1.createStream)(req, res);
            streamManager.addStream(stream);
        }
        else if (req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            const file = fs.createReadStream(path.join(process.cwd(), "./assets/index.html"));
            file.pipe(res);
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });
    (0, server_destroy_1.default)(server);
    return server;
}
async function initServer() {
    await initializeModules(stream_1.streamManager).catch((error) => {
        logger_1.logger.error(error);
        process.exit(1);
    });
    const server = configureServer(stream_1.streamManager);
    process.on("SIGTERM", () => {
        server.destroy((error) => {
            stream_1.streamManager.closeAllStreams();
            if (error) {
                logger_1.logger.error("SIGTERM", error);
                process.exit(1);
            }
            logger_1.logger.info("server closed");
            process.exit(0);
        });
    });
    process.on("SIGINT", () => {
        stream_1.streamManager.closeAllStreams();
        server.destroy((error) => {
            if (error) {
                logger_1.logger.error("SIGINT", error);
                process.exit(1);
            }
            logger_1.logger.info("server closed");
            process.exit(0);
        });
    });
    return server;
}
exports.initServer = initServer;
