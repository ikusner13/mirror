import { getPhoto } from "./fetch-photos";

getPhoto()
  .then((photo) => {
    console.log(photo);
  })
  .catch((error) => {
    console.error(error);
  });
