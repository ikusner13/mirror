import { GoogleCredentialManager } from "../google-auth";
import { getPhoto } from "./google-photos";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const photo = await getPhoto(googleCredentialManager);

  console.log(photo);
}

test().catch((err) => {
  console.error(err);
});
