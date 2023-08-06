import { getEvents } from "./get-calendar-events";

getEvents()
  .then((events) => {
    console.log(events);
  })
  .catch((error) => {
    console.error(error);
  });
