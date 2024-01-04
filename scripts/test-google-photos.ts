import { logger } from "../server/logger";
import { GoogleCredentialManager } from "../server/modules/google-auth";
import { getPhoto } from "../server/modules/google-photos/google-photos";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const photo = await getPhoto(googleCredentialManager);

  logger.info(photo);
}

test().catch((err) => {
  logger.error(err);
});
