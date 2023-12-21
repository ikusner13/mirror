import { logger } from "../../logger";
import { GoogleCredentialManager } from "../google-auth";
import { listEvents } from "./google-calendar";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const events = await listEvents(googleCredentialManager);

  logger.info(events);
}

test().catch((err) => {
  logger.error(err);
});
