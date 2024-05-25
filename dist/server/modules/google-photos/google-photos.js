"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePhotos = exports.getPhoto = void 0;
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = require("../../logger");
const scheduler_1 = require("../../scheduler");
const photoLogger = logger_1.logger.child({ module: "photos" });
/**
 * @link https://developers.google.com/photos/library/guides/apply-filters?hl=en&authuser=1
 */
const albumId = "AKcvZRw9w3qSa3nDLqO4t--2MlRAWjfUPF_6-dlIx7Tx9duEAPIIaOCNO6FF8RnyePjc3HmnbAj5";
async function getPhotos(credentialManager) {
    const token = await credentialManager.getAccessToken();
    const searchResponse = await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
        body: JSON.stringify({
            albumId,
            pageSize: 100, // Get up to 100 media items from the album
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const mediaItems = (await searchResponse.json());
    if (!mediaItems.mediaItems) {
        return [];
    }
    let nextPageToken = mediaItems.nextPageToken;
    if (!nextPageToken) {
        return mediaItems.mediaItems.map((item) => item.baseUrl);
    }
    const allMediaItems = mediaItems.mediaItems;
    while (nextPageToken) {
        const nextPageResponse = await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", {
            body: JSON.stringify({
                albumId,
                pageSize: 100,
                pageToken: nextPageToken,
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const nextPageItems = (await nextPageResponse.json());
        if (nextPageItems.mediaItems) {
            allMediaItems.push(...nextPageItems.mediaItems);
        }
        nextPageToken = nextPageItems.nextPageToken;
    }
    return allMediaItems.map((item) => item.baseUrl);
}
function getRandomPhoto(photoUrls) {
    const randomIndex = crypto_1.default.randomInt(0, photoUrls.length);
    return photoUrls[randomIndex];
}
async function getPhoto(googleCredentialManager) {
    const photos = await getPhotos(googleCredentialManager);
    if (photos.length === 0) {
        return null;
    }
    return getRandomPhoto(photos);
}
exports.getPhoto = getPhoto;
class GooglePhotos {
    streamManager;
    credentialManager;
    job = null;
    constructor(streamManager, credentialManager) {
        this.streamManager = streamManager;
        this.credentialManager = credentialManager;
        this.streamManager.onConnection(() => this.fetchAndSendEvents());
    }
    createJob() {
        return (0, scheduler_1.createCronJob)(async () => {
            photoLogger.info("photo cron");
            await this.fetchAndSendEvents().catch((err) => {
                logger_1.logger.error(err);
                return null;
            });
        }, `0 0 5-23 * * *`);
    }
    async fetchAndSendEvents() {
        // const photo = await getPhoto(this.credentialManager);
        const photos = await getPhotos(this.credentialManager);
        const randomPhoto1 = getRandomPhoto(photos);
        let randomPhoto2 = getRandomPhoto(photos);
        while (randomPhoto1 === randomPhoto2) {
            randomPhoto2 = getRandomPhoto(photos);
        }
        // photoLogger.info("Sending photo to clients", photo);
        this.streamManager.sendEvent("photo1", `<img src=${randomPhoto1} />`);
        this.streamManager.sendEvent("photo2", `<img src=${randomPhoto2} />`);
    }
    async init() {
        photoLogger.info("Initializing Google Photos module");
        this.job = this.createJob();
    }
    start() {
        photoLogger.info("Starting Google Photos module");
        this.job?.start();
    }
}
exports.GooglePhotos = GooglePhotos;
