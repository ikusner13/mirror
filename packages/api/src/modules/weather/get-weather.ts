/// <reference lib="dom" />

const weatherApiKey = "b8d8163c79b9574cc193215f73d445c9";
const ZIP = "43201";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${ZIP},us&units=imperial&appid=${weatherApiKey}`;

async function getWeather() {
  const response = await fetch(apiUrl);
  const weather = await response.json();

  console.log("weather", weather);

  const data = {
    feelsLike: weather.main.feels_like,
    temp: weather.main.temp,
    weather: weather.weather[0].main,
  };

  return data;
}

getWeather()
  .then((weather) => {
    console.log("weather", weather);
  })
  .catch((err) => {
    console.log("err", err);
  });
