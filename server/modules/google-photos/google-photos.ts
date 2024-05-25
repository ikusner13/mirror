import { type CronJob } from "cron";
import crypto from "crypto";

import { logger } from "../../logger";
import { createCronJob } from "../../scheduler";
import { type StreamManager } from "../../stream";
import { type GoogleCredentialManager } from "../google-auth";
import { type Module } from "../module";

type PhotoResponse = {
  mediaItems?: {
    baseUrl: string;
    contributorInfo: object;
    description: string;
    filename: string;
    id: string;
    mediaMetadata: object;
    mimeType: string;
    productUrl: string;
  }[];
  nextPageToken?: string;
};

const photoLogger = logger.child({ module: "photos" });

/**
 * @link https://developers.google.com/photos/library/guides/apply-filters?hl=en&authuser=1
 */
const albumId =
  "AKcvZRw9w3qSa3nDLqO4t--2MlRAWjfUPF_6-dlIx7Tx9duEAPIIaOCNO6FF8RnyePjc3HmnbAj5";

async function getPhotos(credentialManager: GoogleCredentialManager) {
  const token = await credentialManager.getAccessToken();

  const searchResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/mediaItems:search",
    {
      body: JSON.stringify({
        albumId,
        pageSize: 100, // Get up to 100 media items from the album
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  const mediaItems = (await searchResponse.json()) as PhotoResponse;

  if (!mediaItems.mediaItems) {
    return [];
  }

  let nextPageToken = mediaItems.nextPageToken;

  if (!nextPageToken) {
    return mediaItems.mediaItems.map((item) => item.baseUrl);
  }

  const allMediaItems = mediaItems.mediaItems;

  while (nextPageToken) {
    const nextPageResponse = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems:search",
      {
        body: JSON.stringify({
          albumId,
          pageSize: 100,
          pageToken: nextPageToken,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );
    const nextPageItems = (await nextPageResponse.json()) as PhotoResponse;

    if (nextPageItems.mediaItems) {
      allMediaItems.push(...nextPageItems.mediaItems);
    }

    nextPageToken = nextPageItems.nextPageToken;
  }

  return allMediaItems.map((item) => item.baseUrl);
}

function getRandomPhoto(photoUrls: string[]) {
  const randomIndex = crypto.randomInt(0, photoUrls.length);
  return photoUrls[randomIndex]!;
}

export async function getPhoto(
  googleCredentialManager: GoogleCredentialManager,
) {
  const photos = await getPhotos(googleCredentialManager);

  if (photos.length === 0) {
    return null;
  }

  return getRandomPhoto(photos);
}

export class GooglePhotos implements Module {
  private job: CronJob | null = null;

  constructor(
    private streamManager: StreamManager,
    private credentialManager: GoogleCredentialManager,
  ) {
    this.streamManager.onConnection(() => this.fetchAndSendEvents());
  }

  private createJob() {
    return createCronJob(async () => {
      photoLogger.info("photo cron");
      await this.fetchAndSendEvents().catch((err) => {
        logger.error(err);

        return null;
      });
    }, `0 0 5-23 * * *`);
  }

  async fetchAndSendEvents(): Promise<void> {
    const photo = await getPhoto(this.credentialManager);

    if (!photo) {
      return;
    }

    photoLogger.info("Sending photo to clients", photo);
    this.streamManager.sendEvent("photo", `<img src=${photo} />`);
  }

  async init() {
    photoLogger.info("Initializing Google Photos module");
    this.job = this.createJob();
  }

  start() {
    photoLogger.info("Starting Google Photos module");
    this.job?.start();
  }
}
