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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const logger_1 = require("../../logger");
const scheduler_1 = require("../../scheduler");
const messagesLogger = logger_1.logger.child({ module: "messages" });
class Messages {
    streamManager;
    job = null;
    constructor(streamManager) {
        this.streamManager = streamManager;
        this.streamManager.onConnection(() => this.fetchAndSendEvents());
    }
    createJob() {
        return (0, scheduler_1.createCronJob)(async () => {
            await this.fetchAndSendEvents().catch((err) => {
                messagesLogger.error(err);
                return null;
            });
        }, `0 0 5,14,16,20 * * *`);
    }
    getRandomMessage(messages) {
        const index = Math.floor(Math.random() * messages.length);
        return messages[index] ?? "I'm a little teapot";
    }
    async fetchAndSendEvents() {
        const hour = new Date().getHours();
        let messages;
        if (hour >= 5 && hour < 12) {
            messagesLogger.info("sending morning message");
            const morningJson = await Promise.resolve().then(() => __importStar(require("../../../messages-morning.json")));
            messages = morningJson.messages;
        }
        else if (hour >= 20 || hour < 5) {
            messagesLogger.info("sending night message");
            const nightJson = await Promise.resolve().then(() => __importStar(require("../../../messages-evening.json")));
            messages = nightJson.messages;
        }
        else {
            messagesLogger.info("sending hourly message");
            const anytimeJson = await Promise.resolve().then(() => __importStar(require("../../../messages-anytime.json")));
            messages = anytimeJson.messages;
        }
        const message = this.getRandomMessage(messages);
        this.streamManager.sendEvent("message", message);
    }
    async init() {
        this.job = this.createJob();
    }
    start() {
        messagesLogger.info("starting messages module");
        this.job?.start();
    }
}
exports.Messages = Messages;
