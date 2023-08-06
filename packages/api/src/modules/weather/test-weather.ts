import { getWeather } from "./get-weather";

getWeather()
  .then((weather) => {
    console.log(weather);
  })
  .catch((error) => {
    console.error(error);
  });
