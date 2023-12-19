import fs from "fs/promises";

import { type CurrentlyPlayingObject } from "./spotify.api";

const tokenRefreshBase = "https://accounts.spotify.com";
const userBase = "https://api.spotify.com";

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

type GetMyPlayingTrackResponse = {
  is_playing: boolean;
  item?: {
    artistName: string;
    songName: string;
  };
};

export type SpotifyManager = {
  getCredentials: () => SpotifyCredentials;
  getMyPlayingTrack: () => Promise<GetMyPlayingTrackResponse | null>;
  getTrackLoop: (
    onSuccessCB: (track: GetMyPlayingTrackResponse) => void,
  ) => void;
  initialize: () => Promise<void>;
};

function createSpotifyManager(): SpotifyManager {
  let cachedCredentials: SpotifyCredentials | null = null;
  let fetchDelay = 3000;

  const initialize = async (): Promise<void> => {
    if (cachedCredentials) {
      return;
    }

    try {
      const content = await fs.readFile("./spotify.json", "utf-8");
      const loadedCredentials = JSON.parse(content) as SpotifyCredentials;

      cachedCredentials = loadedCredentials;

      await handleTokenRefresh();
    } catch (err) {
      throw new Error("Could not load Spotify credentials");
    }
  };

  const handleTokenRefresh = async () => {
    const data = await refreshAccessToken();

    if (cachedCredentials) {
      cachedCredentials.accessToken = data.access_token;
      cachedCredentials.expiresAt = Date.now() + data.expires_in * 1000;
    }
  };

  const refreshAccessToken = async () => {
    if (!cachedCredentials) {
      throw new Error("Spotify credentials not initialized");
    }

    try {
      const response = await fetch(new URL("api/token", tokenRefreshBase), {
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: cachedCredentials.refreshToken,
        }),
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              cachedCredentials.clientID + ":" + cachedCredentials.clientSecret,
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
      throw new Error("Could not refresh Spotify access token");
    }
  };

  const getCredentials = (): SpotifyCredentials => {
    if (!cachedCredentials) {
      throw new Error("Spotify credentials not initialized");
    }

    return cachedCredentials;
  };

  const getNowPlayingData = async () => {
    if (!cachedCredentials) {
      throw new Error("Spotify credentials not initialized");
    }

    if (Date.now() - fetchDelay > cachedCredentials.expiresAt) {
      await handleTokenRefresh();
    }

    try {
      const response = await fetch(
        new URL("v1/me/player/currently-playing", userBase),
        {
          headers: {
            Authorization: `Bearer ${cachedCredentials.accessToken}`,
          },
          referrerPolicy: "no-referrer",
        },
      );

      if (response.status === 200) {
        const data = (await response.json()) as CurrentlyPlayingObject;
        fetchDelay = 3000;
        return data;
      }

      if (response.status === 204) {
        return null;
      }

      if (response.status === 429) {
        fetchDelay = fetchDelay * 2;
        return null;
      }

      if (response.status === 401) {
        await refreshAccessToken();
        return null;
      }
    } catch (error) {
      return null;
    }

    return null;
  };

  const getMyPlayingTrack = async () => {
    // get now playing data
    const nowPlayingData = await getNowPlayingData();

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

    // if track is playing, return track
    const item = nowPlayingData.item;
    return item as GetMyPlayingTrackResponse;
  };

  const getTrackLoop = (
    onSuccessCB: (track: GetMyPlayingTrackResponse) => void,
  ) => {
    getMyPlayingTrack()
      .then((track) => {
        if (track) {
          onSuccessCB(track);
        }
      })
      .catch((error) => {
        console.error("Error in getTrackLoop:", error);
        // You might want to retry after an error:
      })
      .finally(() => {
        setTimeout(() => getTrackLoop(onSuccessCB), fetchDelay);
      });
  };

  return {
    getCredentials,
    getMyPlayingTrack,
    getTrackLoop,
    initialize,
  };
}

export const spotifyManager = createSpotifyManager();
