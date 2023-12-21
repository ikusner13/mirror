import { logger } from "../../logger";
import { getWeather } from "./weather";

getWeather()
  .then((weather) => {
    logger.info(weather);
  })
  .catch((error) => {
    logger.error(error);
  });
