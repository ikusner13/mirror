import { logger } from "../server/logger";
import { GoogleCredentialManager } from "../server/modules/google-auth";
import { listEvents } from "../server/modules/google-calendar/google-calendar";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const events = await listEvents(googleCredentialManager);

  logger.info(events);
}

test().catch((err) => {
  logger.error(err);
});
