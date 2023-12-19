import { spotifyManager } from "./spotify";

spotifyManager
  .initialize()
  .then(() => {
    spotifyManager
      .getMyPlayingTrack()
      .then((track) => {
        console.log(track);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
