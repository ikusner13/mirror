import { type Auth, google } from "googleapis";

import { loadSavedCredentialsIfExist } from "../../google-auth";

export async function listEvents() {
  const auth =
    (await loadSavedCredentialsIfExist()) as Auth.OAuth2Client | null;

  if (!auth) {
    return [];
  }

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
    console.log(event);
    return {
      id: event.id,
      kind: event.kind,
      startDateTime: event.start?.dateTime,
      summary: event.summary,
    };
  });

  // events.map((event) => {
  //   const start = event.start?.dateTime || event.start?.date;
  //   console.log(`${start} - ${event.summary}`);
  // });
}

listEvents().catch(console.error);
