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

/**
 * @link https://developers.google.com/photos/library/guides/apply-filters?hl=en&authuser=1
 */

const albumId =
  "AKcvZRwngYxfEg0WthniYt7tZG4BW3m5JKYYQGWUu7XNlFmTDcgqGqeK36lh1fF_AuOUTk01MAjc";

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

  return getRandomPhoto(photos);
}

export class GooglePhotos implements Module {
  private job: CronJob | null = null;

  constructor(
    private streamManager: StreamManager,
    private credentialManager: GoogleCredentialManager,
  ) {}

  private createJob() {
    return createCronJob(async () => {
      const photo = await getPhoto(this.credentialManager).catch((err) => {
        logger.error(err);

        return null;
      });

      this.streamManager.sendEvent("photo", JSON.stringify(photo));
    }, `0 */${15} * * * *`);
  }

  async init() {
    this.job = this.createJob();
  }

  start() {
    this.job?.start();
  }
}
