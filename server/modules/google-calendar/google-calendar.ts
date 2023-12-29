import { type CronJob } from "cron";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { google } from "googleapis";

import { logger } from "../../logger";
import { createCronJob } from "../../scheduler";
import { type StreamManager } from "../../stream";
import { html } from "../../utils";
import { type GoogleCredentialManager } from "../google-auth";
import { type Module } from "../module";

dayjs.extend(calendar);

const calendarLogger = logger.child({ module: "calendar" });

type CalendarDTO = {
  id: string;
  kind: string;
  startDateTime: string;
  summary: string;
};

export async function listEvents(credentialManager: GoogleCredentialManager) {
  const auth = credentialManager.getCredentials();

  const calendar = google.calendar({ auth, version: "v3" });

  try {
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

    calendarLogger.info("got calendar events", events.length);

    return events
      .map((event) => {
        return {
          id: event.id,
          kind: event.kind,
          startDateTime: event.start?.dateTime,
          summary: event.summary,
        };
      })
      .slice(0, 5) as CalendarDTO[];
  } catch (error) {
    calendarLogger.error(error);
    return [];
  }
}

export class GoogleCalendar implements Module {
  private job: CronJob | null = null;

  constructor(
    private streamManager: StreamManager,
    private credentialManager: GoogleCredentialManager,
  ) {
    this.streamManager.onConnection(() => this.fetchAndSendEvents());
  }

  private createJob() {
    return createCronJob(async () => {
      calendarLogger.info("calendar cron");
      await this.fetchAndSendEvents().catch((err) => {
        calendarLogger.error(err);

        return null;
      });
    }, `0 */${15} * * * *`);
  }

  private formatCalendarDisplay(date: Date | string) {
    return dayjs(date).calendar(null, {
      nextDay: "[Tomorrow at] HH:mm A",
      nextWeek: "dddd",
      sameDay: "[Today at] HH:mm A",
      sameElse: "MM/DD/YYYY",
    });
  }

  async fetchAndSendEvents() {
    const events = await listEvents(this.credentialManager);

    calendarLogger.info("Sending calendar events to clients", events);

    if (events.length === 0) {
      this.streamManager.sendEvent("calendar", "No events found");
      return;
    }

    const eventList = events.map((event) => {
      return html`<li>
      <p>
      ${event.summary}
      </strong>
      <br />
      <p>
      ${this.formatCalendarDisplay(event.startDateTime)}
      </p>
      </li>`;
    });

    this.streamManager.sendEvent("calendar", `<ul>${eventList.join("")}</ul>`);
  }

  async init() {
    calendarLogger.info("Initializing Google Calendar module");
    this.job = this.createJob();
  }

  start() {
    calendarLogger.info("Starting Google Calendar module");
    // run job immediately
    this.job?.start();
  }
}
