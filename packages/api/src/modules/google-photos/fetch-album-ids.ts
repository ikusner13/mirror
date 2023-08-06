/// <reference lib="dom" />

import { getTokens } from "../../google-auth";

export async function fetchAlbumIds() {
  const tokens = await getTokens();

  if (!tokens?.token) {
    throw new Error("no tokens");
  }

  const albumResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/albums",
    {
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    },
  );
  const albums = await albumResponse.json();

  console.log("your albums are: ", JSON.stringify(albums, null, 2));
}

fetchAlbumIds().catch((err) => {
  console.error("err", err);
});
