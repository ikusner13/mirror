/* eslint-disable n/no-extraneous-import */
import { authenticate } from "@google-cloud/local-auth";
import "@total-typescript/ts-reset";
import fs from "fs/promises";
import { type Auth, google } from "googleapis";
import path from "path";
import process from "process";

import { env } from "../../env";
import { logger } from "../../logger";

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content) as Auth.JWTInput;
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials() {
  const payload = JSON.stringify({
    client_id: env.GOOGLE__CLIENT_ID,
    client_secret: env.GOOGLE__CLIENT_SECRET,
    refresh_token: env.GOOGLE__REFRESH_TOKEN,
    type: "authorized_user",
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  const JSONClient = await loadSavedCredentialsIfExist();
  if (JSONClient) {
    return JSONClient as Auth.OAuth2Client;
  }

  const oAuthClient = await authenticate({
    keyfilePath: CREDENTIALS_PATH,
    scopes: SCOPES,
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (oAuthClient.credentials) {
    await saveCredentials(oAuthClient);
  }

  return oAuthClient;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth: Auth.OAuth2Client) {
  const calendar = google.calendar({ auth, version: "v3" });
  const res = await calendar.events.list({
    calendarId: "primary",
    maxResults: 10,
    orderBy: "startTime",
    singleEvents: true,
    timeMax: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).toISOString(),
    timeMin: new Date().toISOString(),
  });
  const events = res.data.items;

  if (!events || events.length === 0) {
    return [];
  }

  return events;

  // events.map((event) => {
  //   const start = event.start?.dateTime || event.start?.date;
  //   console.log(`${start} - ${event.summary}`);
  // });
}

authorize().then(listEvents).catch(logger.error);
