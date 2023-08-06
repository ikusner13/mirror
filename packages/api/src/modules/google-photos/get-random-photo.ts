import crypto from "crypto";

export function getRandomPhoto(photoUrls: string[]): string {
  const randomIndex = crypto.randomInt(0, photoUrls.length);
  return photoUrls[randomIndex]!;
}
