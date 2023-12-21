import { GoogleCredentialManager } from "../google-auth";
import { listEvents } from "./google-calendar";

async function test() {
  const googleCredentialManager = new GoogleCredentialManager();
  await googleCredentialManager.init();

  const events = await listEvents(googleCredentialManager);

  console.log(events);
}

test().catch((err) => {
  console.error(err);
});
