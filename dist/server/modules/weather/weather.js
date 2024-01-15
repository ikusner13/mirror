"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = exports.getWeather = void 0;
const env_1 = require("../../env");
const logger_1 = require("../../logger");
const scheduler_1 = require("../../scheduler");
const utils_1 = require("../../utils");
const icon_map_1 = require("./icon-map");
const weatherApiKey = env_1.env.WEATHER_API_KEY;
const ZIP = "43201";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${ZIP},us&units=imperial&appid=${weatherApiKey}`;
const weatherLogger = logger_1.logger.child({ module: "weather" });
async function fetchWeatherDetails() {
    const response = await fetch(apiUrl);
    const weather = (await response.json());
    const data = {
        feelsLike: weather.main.feels_like,
        // @ts-expect-error TODO: get around to typing this better
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        icon: icon_map_1.icons[weather.weather[0]?.id ?? 800][weather.weather[0]?.icon ?? ""],
        temp: weather.main.temp,
        weather: weather.weather[0]?.main,
    };
    weatherLogger.info("got weather", data);
    return data;
}
async function getWeather() {
    const weather = await fetchWeatherDetails();
    return weather;
}
exports.getWeather = getWeather;
class Weather {
    streamManager;
    job = null;
    constructor(streamManager) {
        this.streamManager = streamManager;
        this.streamManager.onConnection(() => this.fetchAndSendEvents());
    }
    createJob() {
        return (0, scheduler_1.createCronJob)(async () => {
            await this.fetchAndSendEvents().catch((err) => {
                weatherLogger.error(err);
                return null;
            });
        }, `0 * 5-23 * * *`);
    }
    async fetchAndSendEvents() {
        const weather = await getWeather();
        const htmlString = (0, utils_1.html) `<div>
      <div class="flex items-center gap-2 justify-end">
        <i class=${weather.icon}></i>
        <span>${Math.round(Number(weather.temp))}&deg;</span>
      </div>
      <span class="flex justify-end"> ${weather.weather} </span>
      <span class="flex justify-end">
        Feels like ${Math.round(Number(weather.feelsLike))}&deg;
      </span>
    </div>`;
        this.streamManager.sendEvent("weather", htmlString);
    }
    async init() {
        weatherLogger.info("Initializing Weather module");
        this.job = this.createJob();
    }
    start() {
        weatherLogger.info("Starting Weather module");
        this.job?.start();
    }
}
exports.Weather = Weather;
