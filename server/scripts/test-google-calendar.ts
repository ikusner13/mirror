import { logger } from "../logger";
import { GoogleCredentialManager } from "../modules/google-auth";
import { listEvents } from "../modules/google-calendar/google-calendar";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const events = await listEvents(googleCredentialManager);

  logger.info(events);
}

test().catch((err) => {
  logger.error(err);
});
