import { logger } from "../logger";
import { GoogleCredentialManager } from "../modules/google-auth";
import { getPhoto } from "../modules/google-photos/google-photos";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const photo = await getPhoto(googleCredentialManager);

  logger.info(photo);
}

test().catch((err) => {
  logger.error(err);
});
