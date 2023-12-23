import fs from "fs/promises";
import path from "path";

import { logger } from "../../logger";
import { type StreamManager } from "../../stream";
import { type Module } from "../module";
import { type CurrentlyPlayingObject, type TrackObject } from "./spotify.api";

const tokenRefreshBase = "https://accounts.spotify.com";
const userBase = "https://api.spotify.com";

const TOKEN_PATH = path.join(process.cwd(), "spotify.json");

type SpotifyCredentials = {
  accessToken: string;
  clientID: string;
  clientSecret: string;
  expiresAt: number;
  refreshToken: string;
};

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
};

type SpotifyDTO = {
  artist: string;
  song: string;
};

const spotifyLogger = logger.child({ module: "spotify" });

export class SpotifyManager implements Module {
  private cachedCredentials: SpotifyCredentials | null = null;
  private fetchDelay = 3000;

  constructor(private streamManager: StreamManager) {
    this.streamManager.onConnection(() => this.fetchAndSendEvents());
  }

  fetchAndSendEvents(): Promise<void> {
    return Promise.resolve();
  }

  getCredentials() {
    if (!this.cachedCredentials) {
      throw new Error("Spotify credentials not initialized");
    }

    return this.cachedCredentials;
  }

  async getMyPlayingTrack() {
    // get now playing data
    const nowPlayingData = await this.getNowPlayingData();

    // if no data, return null
    if (!nowPlayingData) {
      return null;
    }

    // if no track, return null
    if (!nowPlayingData.item) {
      return null;
    }

    // if track is not playing, return null
    if (nowPlayingData.is_playing === false) {
      return null;
    }

    // handle music track
    //@ts-expect-error something is wrong with generated spotify types
    if (nowPlayingData.item.type !== "TrackObject") {
      const item = nowPlayingData.item as TrackObject;

      return {
        artist: item.artists?.map((artist) => artist.name).join(", "),
        song: item.name,
      } as SpotifyDTO;
    }

    return null;
  }

  async getNowPlayingData() {
    if (!this.cachedCredentials) {
      throw new Error("Spotify credentials not initialized");
    }

    if (Date.now() - this.fetchDelay > this.cachedCredentials.expiresAt) {
      await this.handleTokenRefresh();
    }

    try {
      const response = await fetch(
        new URL("v1/me/player/currently-playing", userBase),
        {
          headers: {
            Authorization: `Bearer ${this.cachedCredentials.accessToken}`,
          },
          referrerPolicy: "no-referrer",
        },
      );

      if (response.status === 200) {
        const data = (await response.json()) as CurrentlyPlayingObject;
        this.fetchDelay = 3000;
        return data;
      }

      if (response.status === 204) {
        return null;
      }

      if (response.status === 429) {
        this.fetchDelay = this.fetchDelay * 2;
        return null;
      }

      if (response.status === 401) {
        await this.refreshAccessToken();
        return null;
      }
    } catch (error) {
      return null;
    }

    return null;
  }

  getTrackLoop(onSuccessCB: (track: SpotifyDTO) => void) {
    this.getMyPlayingTrack()
      .then((track) => {
        if (track) {
          onSuccessCB(track);
        }
      })
      .catch((error) => {
        spotifyLogger.error(error);
        // You might want to retry after an error:
      })
      .finally(() => {
        setTimeout(() => {
          this.getTrackLoop(onSuccessCB);
        }, this.fetchDelay);
      });
  }

  async handleTokenRefresh() {
    const data = await this.refreshAccessToken();

    if (this.cachedCredentials) {
      this.cachedCredentials.accessToken = data.access_token;
      this.cachedCredentials.expiresAt = Date.now() + data.expires_in * 1000;
    }
  }

  async init() {
    if (this.cachedCredentials) {
      return;
    }

    spotifyLogger.info("Initializing Spotify module");

    try {
      const content = await fs.readFile(TOKEN_PATH, "utf-8");
      const loadedCredentials = JSON.parse(content) as SpotifyCredentials;

      this.cachedCredentials = loadedCredentials;

      await this.handleTokenRefresh();
    } catch (err) {
      throw new Error("Could not load Spotify credentials");
    }
  }

  async refreshAccessToken() {
    if (!this.cachedCredentials) {
      throw new Error("Spotify credentials not initialized");
    }

    try {
      const response = await fetch(new URL("api/token", tokenRefreshBase), {
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.cachedCredentials.refreshToken,
        }),
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              this.cachedCredentials.clientID +
                ":" +
                this.cachedCredentials.clientSecret,
            ).toString("base64"),
        },
        method: "POST",
      });

      if (response.ok) {
        const data = (await response.json()) as RefreshTokenResponse;
        return data;
      }

      throw new Error("Could not refresh Spotify access token");
    } catch (error) {
      spotifyLogger.error(error);
      throw new Error("Could not refresh Spotify access token");
    }
  }

  start() {
    spotifyLogger.info("Initializing Spotify module");
    this.getTrackLoop((track) => {
      this.streamManager.sendEvent("spotify", JSON.stringify(track));
    });
  }
}
