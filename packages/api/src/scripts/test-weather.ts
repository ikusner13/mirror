import { logger } from "../logger";
import { getWeather } from "../modules/weather/weather";

getWeather()
  .then((weather) => {
    logger.info(weather);
  })
  .catch((error) => {
    logger.error(error);
  });
