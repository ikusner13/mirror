import { type CronJob } from "cron";
import { google } from "googleapis";

import { createCronJob } from "../../scheduler";
import { type StreamManager } from "../../stream";
import { type GoogleCredentialManager } from "../google-auth";
import { type Module } from "../module";

async function listEvents(credentialManager: GoogleCredentialManager) {
  const auth = credentialManager.getCredentials();

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

export class GoogleCalendar implements Module {
  private job: CronJob | null = null;

  constructor(
    private streamManager: StreamManager,
    private credentialManager: GoogleCredentialManager,
  ) {}

  private createJob() {
    return createCronJob(async () => {
      const events = await listEvents(this.credentialManager);

      this.streamManager.sendEvent("calendar", JSON.stringify(events));
    }, `0 */${15} * * * *`);
  }

  async init() {
    this.job = this.createJob();
  }

  start() {
    this.job?.start();
  }
}
