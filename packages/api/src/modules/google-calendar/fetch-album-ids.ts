/// <reference lib="dom" />

import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), "token.json");

const MIRROR_ALBUM_ID =
  "AKcvZRwngYxfEg0WthniYt7tZG4BW3m5JKYYQGWUu7XNlFmTDcgqGqeK36lh1fF_AuOUTk01MAjc";

export async function fetchAlbumIds() {
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

  const albumResponse = await fetch(
    "https://photoslibrary.googleapis.com/v1/albums",
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    },
  );
  const albums = await albumResponse.json();

  console.log("your albums are: ", JSON.stringify(albums, null, 2));
}

fetchAlbumIds().catch((err) => {
  console.error("err", err);
});
