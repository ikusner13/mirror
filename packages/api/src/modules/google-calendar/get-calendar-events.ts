import { google } from "googleapis";

import { googleCredentialManager } from "../../google-auth";

async function listEvents() {
  const auth = googleCredentialManager.getCredentials();

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

  return events.map((event) => {
    return {
      id: event.id,
      kind: event.kind,
      startDateTime: event.start?.dateTime,
      summary: event.summary,
    };
  });
}

export async function getEvents() {
  const events = await listEvents();

  return events;
}
