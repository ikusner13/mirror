/// <reference lib="dom" />

import { logger } from "../logger";
import { GoogleCredentialManager } from "../modules/google-auth";

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

  logger.info("your albums are: ", albums);
}

fetchAlbumIds().catch((err) => {
  logger.error(err);
});
