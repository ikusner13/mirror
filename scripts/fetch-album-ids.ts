/// <reference lib="dom" />

import { logger } from "../server/logger";
import { GoogleCredentialManager } from "../server/modules/google-auth";

export async function fetchAlbumIds() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();
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

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(albums, null, 2));
}

fetchAlbumIds().catch((err) => {
  logger.error(err);
});
