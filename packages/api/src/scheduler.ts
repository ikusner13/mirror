import { CronJob } from "cron";

export const createCronJob = (
  task: () => Promise<void>,
  cronString: string,
) => {
  return new CronJob(cronString, () => {
    task().catch((error) => {
      console.error(error);
    });
  });
};

export const testJob = (task: () => void, seconds: number) => {
  return new CronJob(`*/${seconds} * * * * *`, task);
};

export const createMessageJob = ({
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
