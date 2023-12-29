import { logger } from "../logger";
import { SpotifyManager } from "../modules/spotify/spotify";
import { type StreamManager } from "../stream";

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
