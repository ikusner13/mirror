import { type CronJob } from "cron";

import { logger } from "../../logger";
import { createCronJob } from "../../scheduler";
import { type StreamManager } from "../../stream";
import { type Module } from "../module";

const messagesLogger = logger.child({ module: "messages" });

export class Messages implements Module {
  private job: CronJob | null = null;
  constructor(private streamManager: StreamManager) {
    this.streamManager.onConnection(() => this.fetchAndSendEvents());
  }

  private createJob() {
    return createCronJob(async () => {
      await this.fetchAndSendEvents().catch((err) => {
        messagesLogger.error(err);

        return null;
      });
    }, `0 0 5,14,16,20 * * *`);
  }

  private getRandomMessage(messages: string[]) {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index] ?? "I'm a little teapot";
  }

  public async fetchAndSendEvents() {
    const hour = new Date().getHours();

    let messages: string[];

    if (hour >= 5 && hour < 12) {
      messagesLogger.info("sending morning message");
      const morningJson = await import("../../../messages-morning.json");

      messages = morningJson.messages;
    } else if (hour >= 20 || hour < 5) {
      messagesLogger.info("sending night message");

      const nightJson = await import("../../../messages-evening.json");

      messages = nightJson.messages;
    } else {
      messagesLogger.info("sending hourly message");

      const anytimeJson = await import("../../../messages-anytime.json");

      messages = anytimeJson.messages;
    }

    const message = this.getRandomMessage(messages);

    this.streamManager.sendEvent("message", message);
  }

  public async init() {
    this.job = this.createJob();
  }

  public start() {
    messagesLogger.info("starting messages module");

    this.job?.start();
  }
}
