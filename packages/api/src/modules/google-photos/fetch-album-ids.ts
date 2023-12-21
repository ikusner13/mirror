/// <reference lib="dom" />

import { GoogleCredentialManager } from "../google-auth";

export async function fetchAlbumIds() {
  const googleCredentialManager = new GoogleCredentialManager();
  const token = await googleCredentialManager.getAccessToken();

  const albumResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/albums",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const albums = await albumResponse.json();

  console.log("your albums are: ", JSON.stringify(albums, null, 2));
}

fetchAlbumIds().catch((err) => {
  console.error("err", err);
});
