import { googleCredentialManager } from "../../google-auth";
import { googleCalendar } from "./google-calendar";

googleCredentialManager
  .initialize()
  .then(() => {
    googleCalendar
      .getUpcomingEvents()
      .then((events) => {
        console.log(events);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
