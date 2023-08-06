import { getMyPlayingTrack } from "./get-now-playing";

getMyPlayingTrack()
  .then((track) => {
    console.log("track", track);
  })
  .catch((error) => {
    console.error(error);
  });
