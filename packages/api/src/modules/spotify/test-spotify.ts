import { logger } from "../../logger";
import { type StreamManager } from "../../stream";
import { SpotifyManager } from "./spotify";

async function test() {
  const mockStreamManager = {} as StreamManager;

  const spotifyManager = new SpotifyManager(mockStreamManager);
  await spotifyManager.init();

  const response = await spotifyManager.getMyPlayingTrack();

  logger.info(response);
}

test().catch((err) => {
  logger.error(err);
});
