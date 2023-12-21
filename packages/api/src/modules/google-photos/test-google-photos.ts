import { logger } from "../../logger";
import { GoogleCredentialManager } from "../google-auth";
import { getPhoto } from "./google-photos";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const photo = await getPhoto(googleCredentialManager);

  logger.info(photo);
}

test().catch((err) => {
  logger.error(err);
});
