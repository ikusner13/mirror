/// <reference lib="dom" />

import { type CurrentlyPlayingObject } from "./spotify.api";

const config = {
  accessToken:
    "BQB1Zz_5Pc7uvTC-t7if767pK3ROzrsTBSzi27-Bum2zN0k8yH3uBzozkldHXPWoEsIF0UKgjWM-sQM23BDiB2IrXcq93HOYPmjfFIm4dRQc6wgscYIdZRhgYFINguqaHhgMoqf1HBPqXQAlBgR7zlKxzvu7kV89sA2OUqEqvr8qX31JJTiq37WxxjWqmLfjc184KzJ_",
  clientID: "ea6138f43f35409db024428889e1aa73",
  clientSecret: "5284397c71cd413d8915d49cfa205684",
  refreshToken:
    "AQCJcSR86L2RB0tw0AWR2jiFm6ZR4fqnYHEQuVAy6xtQZy-V9GEeDnXnZXsGhCeilIPuCufjwJA6iFYb52ZfJJnsczaQu2BQh38dMhdjZOWpX9p3DEcQN6WVdvx9CLIfEic",
};

const tokenRefreshBase = "https://accounts.spotify.com";
const userBase = "https://api.spotify.com";

async function getNowPlayingData() {
  try {
    const response = await fetch(
      new URL("v1/me/player/currently-playing", userBase),
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
        referrerPolicy: "no-referrer",
      },
    );

    if (response.status === 200) {
      const data = (await response.json()) as CurrentlyPlayingObject;
      console.log("data", data);
      return data;
    }

    if (response.status === 204) {
      return null;
    }

    if (response.status === 429) {
      console.error("Rate limit exceeded");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return null;
}

async function refreshAccessToken() {
  try {
    const response = await fetch(new URL("api/token", tokenRefreshBase), {
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: config.refreshToken,
      }),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(config.clientID + ":" + config.clientSecret).toString(
            "base64",
          ),
      },
      method: "POST",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return null;
}

type GetMyPlayingTrackResponse = {
  is_playing: boolean;
  item?: {
    artistName: string;
    songName: string;
  };
};

export async function getMyPlayingTrack() {
  if (!config.accessToken) {
    await refreshAccessToken();
  }

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
}

const timeoutTime = 5000; // 5 seconds

export function getTrackLoop(
  onSuccessCB: (track: GetMyPlayingTrackResponse) => void,
) {
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
      setTimeout(() => getTrackLoop(onSuccessCB), timeoutTime);
    });
}
