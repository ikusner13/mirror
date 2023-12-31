import { type Auth, google } from "googleapis";

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
      const credentials = await Bun.file("token.json").json<Auth.JWTInput>();
      this.cachedCredentials = google.auth.fromJSON(
        credentials,
      ) as Auth.OAuth2Client;
    } catch (err) {
      throw new Error("Failed to initialize: No credentials found");
    }
  }
}
