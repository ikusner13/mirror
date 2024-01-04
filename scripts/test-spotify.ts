import { logger } from "../server/logger";
import { SpotifyManager } from "../server/modules/spotify/spotify";
import { type StreamManager } from "../server/stream";

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
