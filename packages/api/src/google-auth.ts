import "@total-typescript/ts-reset";
import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

export type GoogleCredentialManager = {
  getAccessToken: () => Promise<string>;
  getCredentials: () => Auth.OAuth2Client;
  initialize: () => Promise<void>;
};

function createGoogleCredentialManager(): GoogleCredentialManager {
  let cachedCredentials: Auth.OAuth2Client | null = null;

  const initialize = async (): Promise<void> => {
    if (cachedCredentials) {
      return;
    }

    try {
      const content = await fs.readFile(TOKEN_PATH, "utf-8");
      const credentials = JSON.parse(content) as Auth.JWTInput;
      cachedCredentials = google.auth.fromJSON(
        credentials,
      ) as Auth.OAuth2Client;
    } catch (err) {
      throw new Error("Failed to initialize: No credentials found");
    }
  };

  const getAccessToken = async (): Promise<string> => {
    if (!cachedCredentials) {
      throw new Error("Credentials not initialized");
    }

    const token = await cachedCredentials.getAccessToken();

    if (!token.token) {
      throw new Error("No token found");
    }

    return token.token;
  };

  const getCredentials = (): Auth.OAuth2Client => {
    if (!cachedCredentials) {
      throw new Error("Credentials not initialized");
    }

    return cachedCredentials;
  };

  return {
    getAccessToken,
    getCredentials,
    initialize,
  };
}

export const googleCredentialManager = createGoogleCredentialManager();
