const weatherApiKey = "b8d8163c79b9574cc193215f73d445c9";
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
  temp?: number;
  weather?: string;
};

async function fetchWeatherDetails() {
  const response = await fetch(apiUrl);
  const weather = (await response.json()) as OpenWeatherResponse;

  const data = {
    feelsLike: weather.main.feels_like,
    temp: weather.main.temp,
    weather: weather.weather[0]?.main,
  } as WeatherResponse;

  return data;
}

export async function getWeather() {
  const weather = await fetchWeatherDetails();

  return weather;
}
