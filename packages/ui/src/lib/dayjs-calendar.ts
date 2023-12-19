import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

export const getCalendarDisplay = (date: Date | string) => {
  return dayjs(date).calendar(null, {
    nextDay: "[Tomorrow at] HH:mm A",
    nextWeek: "dddd",
    sameDay: "[Today at] HH:mm A",
    sameElse: "MM/DD/YYYY",
  });
};
