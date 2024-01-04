import { logger } from "../server/logger";
import { getWeather } from "../server/modules/weather/weather";

getWeather()
  .then((weather) => {
    logger.info(weather);
  })
  .catch((error) => {
    logger.error(error);
  });
