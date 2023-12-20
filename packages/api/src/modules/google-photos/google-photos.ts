import crypto from "crypto";

import {
  type GoogleCredentialManager,
  googleCredentialManager,
} from "../../google-auth";

type PhotoResponse = {
  mediaItems: {
    baseUrl: string;
    contributorInfo: object;
    description: string;
    filename: string;
    id: string;
    mediaMetadata: object;
    mimeType: string;
    productUrl: string;
  }[];
  nextPageToken: string;
};

/**
 * @link https://developers.google.com/photos/library/guides/apply-filters?hl=en&authuser=1
 */

const albumId =
  "AKcvZRwngYxfEg0WthniYt7tZG4BW3m5JKYYQGWUu7XNlFmTDcgqGqeK36lh1fF_AuOUTk01MAjc"; // Replace with your album ID

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

    allMediaItems.push(...nextPageItems.mediaItems);

    nextPageToken = nextPageItems.nextPageToken;
  }

  return allMediaItems.map((item) => item.baseUrl);
}

function getRandomPhoto(photoUrls: string[]) {
  const randomIndex = crypto.randomInt(0, photoUrls.length);
  return photoUrls[randomIndex]!;
}

export async function getPhoto() {
  const photos = await getPhotos(googleCredentialManager);

  return getRandomPhoto(photos);
}
