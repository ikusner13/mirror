import { type CronJob } from "cron";

import { env } from "../../env";
import { logger } from "../../logger";
import { createCronJob } from "../../scheduler";
import { type StreamManager } from "../../stream";
import { html } from "../../utils";
import { type Module } from "../module";
import { icons } from "./icon-map";

const weatherApiKey = env.WEATHER_API_KEY;
const ZIP = "43201";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${ZIP},us&units=imperial&appid=${weatherApiKey}`;

type OpenWeatherResponse = {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  rain: {
    "1h": number;
  };
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
};

type WeatherResponse = {
  feelsLike?: number;
  icon: string;
  temp?: number;
  weather?: string;
};

const weatherLogger = logger.child({ module: "weather" });

async function fetchWeatherDetails() {
  const response = await fetch(apiUrl);
  const weather = (await response.json()) as OpenWeatherResponse;

  const data = {
    feelsLike: weather.main.feels_like,
    // @ts-expect-error TODO: get around to typing this better
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    icon: icons[weather.weather[0]?.id ?? 800][weather.weather[0]?.icon ?? ""],
    temp: weather.main.temp,
    weather: weather.weather[0]?.main,
  } as WeatherResponse;

  weatherLogger.info("got weather", data);

  return data;
}

export async function getWeather() {
  const weather = await fetchWeatherDetails();

  return weather;
}

export class Weather implements Module {
  private job: CronJob | null = null;

  constructor(private streamManager: StreamManager) {
    this.streamManager.onConnection(() => this.fetchAndSendEvents());
  }

  private createJob() {
    return createCronJob(async () => {
      await this.fetchAndSendEvents().catch((err) => {
        weatherLogger.error(err);

        return null;
      });
    }, `0 */${10} * * * *`);
  }

  async fetchAndSendEvents() {
    const weather = await getWeather();

    const htmlString = html`<div>
      <div class="flex items-center gap-2">
        <i class=${weather.icon}></i>
        <span>${Math.round(Number(weather.temp))}&deg;</span>
      </div>
      <span class="flex justify-end">${weather.weather}</span>
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
