import "@total-typescript/ts-reset";
import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

class GoogleCredentialManager {
  getAccessToken = async (): Promise<string> => {
    if (!this.cachedCredentials) {
      throw new Error("Credentials not initialized");
    }

    const token = await this.cachedCredentials.getAccessToken();

    if (!token.token) {
      throw new Error("No token found");
    }

    return token.token;
  };

  getCredentials = (): Auth.OAuth2Client => {
    if (!this.cachedCredentials) {
      throw new Error("Credentials not initialized");
    }

    return this.cachedCredentials;
  };

  constructor(private cachedCredentials: Auth.OAuth2Client | null = null) {}

  async initialize() {
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

export const googleCredentialManager = new GoogleCredentialManager();
