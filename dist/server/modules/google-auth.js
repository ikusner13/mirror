"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCredentialManager = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const TOKEN_PATH = path_1.default.join(process_1.default.cwd(), "token.json");
class GoogleCredentialManager {
    cachedCredentials;
    constructor(cachedCredentials = null) {
        this.cachedCredentials = cachedCredentials;
    }
    async getAccessToken() {
        if (!this.cachedCredentials) {
            throw new Error("Credentials not initialized");
        }
        const token = await this.cachedCredentials.getAccessToken();
        if (!token.token) {
            throw new Error("No token found");
        }
        return token.token;
    }
    getCredentials() {
        if (!this.cachedCredentials) {
            throw new Error("Credentials not initialized");
        }
        return this.cachedCredentials;
    }
    async init() {
        if (this.cachedCredentials) {
            return;
        }
        try {
            const content = await promises_1.default.readFile(TOKEN_PATH, "utf-8");
            const credentials = JSON.parse(content);
            this.cachedCredentials = googleapis_1.google.auth.fromJSON(credentials);
        }
        catch (err) {
            throw new Error("Failed to initialize: No credentials found");
        }
    }
}
exports.GoogleCredentialManager = GoogleCredentialManager;
