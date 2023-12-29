import { CronJob } from "cron";

import { logger } from "./logger";

export function createCronJob(task: () => Promise<void>, cronString: string) {
  return new CronJob(cronString, () => {
    task().catch((error) => {
      logger.error(error);
    });
  });
}

export function testJob(task: () => void, seconds: number) {
  return new CronJob(`*/${seconds} * * * * *`, task);
}

export function createMessageJob({
  bedtimeTask,
  morningTask,
}: {
  bedtimeTask: () => void;
  morningTask: () => void;
}) {
  return new CronJob(
    "30 5,20 * * *",
    function () {
      const currentHour = new Date().getHours();

      if (currentHour === 5) {
        morningTask();
      } else if (currentHour === 20) {
        bedtimeTask();
      }
    },
    null,
    false,
    "America/Los_Angeles",
  );
}
