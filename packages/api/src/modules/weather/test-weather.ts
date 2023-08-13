import { getWeather } from "./weather";

getWeather()
  .then((weather) => {
    console.log(weather);
  })
  .catch((error) => {
    console.error(error);
  });
