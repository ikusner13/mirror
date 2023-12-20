import { googleCredentialManager } from "../../google-auth";
import { getPhoto } from "./google-photos";

async function test() {
  await googleCredentialManager.initialize();

  const photo = await getPhoto();

  console.log(photo);
}

test().catch((err) => {
  console.error(err);
});
