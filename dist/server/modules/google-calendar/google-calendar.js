"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendar = exports.listEvents = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const calendar_1 = __importDefault(require("dayjs/plugin/calendar"));
const googleapis_1 = require("googleapis");
const logger_1 = require("../../logger");
const scheduler_1 = require("../../scheduler");
const utils_1 = require("../../utils");
dayjs_1.default.extend(calendar_1.default);
const calendarLogger = logger_1.logger.child({ module: "calendar" });
async function listEvents(credentialManager) {
    const auth = credentialManager.getCredentials();
    const calendar = googleapis_1.google.calendar({ auth, version: "v3" });
    try {
        const res = await calendar.events.list({
            calendarId: "primary",
            maxResults: 10,
            orderBy: "startTime",
            singleEvents: true,
            timeMax: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
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
            .slice(0, 5);
    }
    catch (error) {
        calendarLogger.error(error);
        return [];
    }
}
exports.listEvents = listEvents;
class GoogleCalendar {
    streamManager;
    credentialManager;
    job = null;
    constructor(streamManager, credentialManager) {
        this.streamManager = streamManager;
        this.credentialManager = credentialManager;
        this.streamManager.onConnection(() => this.fetchAndSendEvents());
    }
    createJob() {
        return (0, scheduler_1.createCronJob)(async () => {
            calendarLogger.info("calendar cron");
            await this.fetchAndSendEvents().catch((err) => {
                calendarLogger.error(err);
                return null;
            });
        }, `0 */5 5-23 * * *`);
    }
    formatCalendarDisplay(date) {
        return (0, dayjs_1.default)(date).calendar(null, {
            nextDay: "[Tomorrow at] HH:mm A",
            nextWeek: "dddd",
            sameDay: "[Today at] HH:mm A",
            sameElse: "MM/DD/YYYY",
        });
    }
    getIconForEvent(event) {
        if (event.summary.toLowerCase().includes("birthday") ||
            event.kind === "calendar#birthday" ||
            event.summary.toLowerCase().includes("bday")) {
            return "ri-cake-2-line";
        }
        if (event.summary.toLowerCase().includes("anniversary")) {
            return "ri-hearts-line";
        }
        return "ri-calendar-event-line";
    }
    async fetchAndSendEvents() {
        const events = await listEvents(this.credentialManager);
        calendarLogger.info("Sending calendar events to clients", events);
        if (events.length === 0) {
            this.streamManager.sendEvent("calendar", "No events found");
            return;
        }
        const eventList = events.map((event) => {
            return (0, utils_1.html) `<div>
        <div class="flex gap-2 items-center">
          <i class=${this.getIconForEvent(event)}></i>
          <p>${event.summary}</p>
        </div>
        <div>
          <p class="text-sm">
            ${this.formatCalendarDisplay(event.startDateTime)}
          </p>
        </div>
      </div>`;
        });
        this.streamManager.sendEvent("calendar", `<div class="flex flex-col gap-4">${eventList.join("")}</div>`);
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
exports.GoogleCalendar = GoogleCalendar;
