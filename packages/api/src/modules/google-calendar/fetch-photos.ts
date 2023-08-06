/// <reference lib="dom" />

import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

const albumId =
  "AKcvZRwngYxfEg0WthniYt7tZG4BW3m5JKYYQGWUu7XNlFmTDcgqGqeK36lh1fF_AuOUTk01MAjc"; // Replace with your album ID

async function getPhotos() {
  let oAuthClient: Auth.OAuth2Client;
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content) as Auth.JWTInput;
    oAuthClient = google.auth.fromJSON(credentials) as Auth.OAuth2Client;
  } catch (err) {
    console.error("err", err);
    return;
  }

  const token = await oAuthClient.getAccessToken();

  if (!token.token) {
    console.log("token", token);
    console.error("no token");
    return;
  }

  const searchResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/mediaItems:search",
    {
      body: JSON.stringify({
        albumId,
        pageSize: 100, // Get up to 100 media items from the album
      }),
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
  const mediaItems = await searchResponse.json();

  console.log(mediaItems);
}

getPhotos().catch((err) => {
  console.log("err", err);
});
