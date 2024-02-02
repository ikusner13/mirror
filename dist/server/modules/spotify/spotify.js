"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyManager = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const tokenRefreshBase = "https://accounts.spotify.com";
const userBase = "https://api.spotify.com";
const TOKEN_PATH = path_1.default.join(process.cwd(), "spotify.json");
const spotifyLogger = logger_1.logger.child({ module: "spotify" });
class SpotifyManager {
    streamManager;
    cachedCredentials = null;
    fetchDelay = 3000;
    isPlaying = false;
    constructor(streamManager) {
        this.streamManager = streamManager;
        this.streamManager.onConnection(() => this.fetchAndSendEvents());
    }
    fetchAndSendEvents() {
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
            const item = nowPlayingData.item;
            return {
                artist: item.artists?.map((artist) => artist.name).join(", "),
                song: item.name,
            };
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
            const response = await fetch(new URL("v1/me/player/currently-playing", userBase), {
                headers: {
                    Authorization: `Bearer ${this.cachedCredentials.accessToken}`,
                },
                referrerPolicy: "no-referrer",
            });
            if (response.status === 200) {
                const data = (await response.json());
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
        }
        catch (error) {
            return null;
        }
        return null;
    }
    getTrackLoop(onSuccessCB) {
        this.getMyPlayingTrack()
            .then((track) => {
            if (!track && this.isPlaying) {
                this.isPlaying = false;
                this.streamManager.sendEvent("spotify", `<span></span>`);
            }
            else if (track) {
                if (!this.isPlaying) {
                    this.isPlaying = true;
                }
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
            const content = await promises_1.default.readFile(TOKEN_PATH, "utf-8");
            const loadedCredentials = JSON.parse(content);
            this.cachedCredentials = loadedCredentials;
            await this.handleTokenRefresh();
        }
        catch (err) {
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
                    Authorization: "Basic " +
                        Buffer.from(this.cachedCredentials.clientID +
                            ":" +
                            this.cachedCredentials.clientSecret).toString("base64"),
                },
                method: "POST",
            });
            if (response.ok) {
                const data = (await response.json());
                return data;
            }
            throw new Error("Could not refresh Spotify access token");
        }
        catch (error) {
            spotifyLogger.error(error);
            throw new Error("Could not refresh Spotify access token");
        }
    }
    start() {
        spotifyLogger.info("Initializing Spotify module");
        this.getTrackLoop((track) => {
            const artist = track.artist;
            const song = track.song;
            const htmlString = (0, utils_1.html) `<div>
        <div class="flex flex col place-items-center gap-2 w-full">
          <i class="ri-headphone-line"></i>
          <div class="truncate">
            <span>${song}</span>
          </div>
        </div>
        <div class="flex flex col place-items-center gap-2 w-full">
          <i class="ri-album-line"></i>
          <div class="truncate">
            <span>${artist}</span>
          </div>
        </div>
      </div>`;
            this.streamManager.sendEvent("spotify", htmlString);
        });
    }
}
exports.SpotifyManager = SpotifyManager;
