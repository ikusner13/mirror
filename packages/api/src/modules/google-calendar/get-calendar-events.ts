import { type Auth, google } from "googleapis";

import { loadSavedCredentialsIfExist } from "../../google-auth";

async function listEvents() {
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
}

export function getEvents(cb: (events: any[]) => void) {
  listEvents()
    .then((events) => {
      cb(events);
    })
    .catch((err) => {
      console.error("err", err);
    });
}

//listEvents().catch(console.error);
