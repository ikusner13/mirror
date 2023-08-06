import { getPhoto } from "./fetch-photos";

getPhoto((photo) => {
  console.log("photo", photo);
});
