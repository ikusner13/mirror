"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageJob = exports.testJob = exports.createCronJob = void 0;
const cron_1 = require("cron");
const logger_1 = require("./logger");
function createCronJob(task, cronString) {
    return new cron_1.CronJob(cronString, () => {
        task().catch((error) => {
            logger_1.logger.error(error);
        });
    });
}
exports.createCronJob = createCronJob;
function testJob(task, seconds) {
    return new cron_1.CronJob(`*/${seconds} * * * * *`, task);
}
exports.testJob = testJob;
function createMessageJob({ bedtimeTask, morningTask, }) {
    return new cron_1.CronJob("30 5,20 * * *", function () {
        const currentHour = new Date().getHours();
        if (currentHour === 5) {
            morningTask();
        }
        else if (currentHour === 20) {
            bedtimeTask();
        }
    }, null, false, "America/Los_Angeles");
}
exports.createMessageJob = createMessageJob;
