import { CronJob } from "cron";

export const topOfTheHourJob = (task: () => void) => {
  return new CronJob("0 0 * * * *", task);
};

export const everyXMinutesJob = (task: () => void, minutes: number) => {
  return new CronJob(`0 */${minutes} * * * *`, task);
};

export const everyXSecondsJob = (task: () => void, seconds: number) => {
  return new CronJob(`*/${seconds} * * * * *`, task);
};

export const morningJob = (task: () => void) => {
  new CronJob(
    "0 45 5 * * *",
    () => {
      task();
    },
    null,
    false,
    "America/New_York",
  );
};

export const bedtimeJob = (task: () => void) => {
  new CronJob(
    "0 0 20 * * *",
    () => {
      task();
    },
    null,
    false,
    "America/New_York",
  );
};

export const morningAndBedtimeJob = ({
  bedtimeTask,
  morningTask,
}: {
  bedtimeTask: () => void;
  morningTask: () => void;
}) => {
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
};
