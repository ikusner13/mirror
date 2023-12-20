import { googleCredentialManager } from "../../google-auth";
import { getUpcomingEvents } from "./google-calendar";

googleCredentialManager
  .initialize()
  .then(() => {
    getUpcomingEvents()
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
