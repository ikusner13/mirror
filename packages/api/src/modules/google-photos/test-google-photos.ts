import { googleCredentialManager } from "../../google-auth";
import { googlePhotos } from "./google-photos";

googleCredentialManager
  .initialize()
  .then(() => {
    googlePhotos
      .getPhoto()
      .then((photo) => {
        console.log(photo);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
