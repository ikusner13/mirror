import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

export class GoogleCredentialManager {
  constructor(private cachedCredentials: Auth.OAuth2Client | null = null) {}

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
      const content = await fs.readFile(TOKEN_PATH, "utf-8");
      const credentials = JSON.parse(content) as Auth.JWTInput;
      this.cachedCredentials = google.auth.fromJSON(
        credentials,
      ) as Auth.OAuth2Client;
    } catch (err) {
      throw new Error("Failed to initialize: No credentials found");
    }
  }
}
