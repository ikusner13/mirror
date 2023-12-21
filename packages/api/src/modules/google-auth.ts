import { type Auth, google } from "googleapis";

import { env } from "../env";

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

  init() {
    if (this.cachedCredentials) {
      return;
    }

    try {
      const oauth2Client = new google.auth.OAuth2({
        clientId: env.GOOGLE__CLIENT_ID,
        clientSecret: env.GOOGLE__CLIENT_SECRET,
      });

      oauth2Client.setCredentials({
        refresh_token: env.GOOGLE__REFRESH_TOKEN,
      });

      this.cachedCredentials = oauth2Client;
    } catch (err) {
      throw new Error("Failed to initialize: No credentials found");
    }
  }
}
