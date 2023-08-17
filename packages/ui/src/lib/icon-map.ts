import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Haze,
  MoonStar,
  Snowflake,
  Sun,
  Tornado,
} from "lucide-svelte";

export const icons = {
  // thunderstorm
  200: { "11d": CloudLightning, "11n": CloudLightning },
  201: { "11d": CloudLightning, "11n": CloudLightning },
  202: { "11d": CloudLightning, "11n": CloudLightning },
  210: { "11d": CloudLightning, "11n": CloudLightning },
  211: { "11d": CloudLightning, "11n": CloudLightning },
  212: { "11d": CloudLightning, "11n": CloudLightning },
  221: { "11d": CloudLightning, "11n": CloudLightning },
  230: { "11d": CloudLightning, "11n": CloudLightning },
  231: { "11d": CloudLightning, "11n": CloudLightning },
  232: { "11d": CloudLightning, "11n": CloudLightning },
  // drizzle
  300: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  301: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  302: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  310: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  311: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  312: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  313: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  314: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  321: { "09d": CloudDrizzle, "09n": CloudDrizzle },
  // rain
  500: { "10d": CloudSunRain, "10n": CloudMoonRain },
  501: { "10d": CloudSunRain, "10n": CloudMoonRain },
  502: { "10d": CloudRainWind, "10n": CloudRainWind },
  503: { "10d": CloudRainWind, "10n": CloudRainWind },
  504: { "10d": CloudRainWind, "10n": CloudRainWind },
  511: { "13d": CloudHail, "13n": CloudHail },
  520: { "09d": CloudSunRain, "09n": CloudMoonRain },
  521: { "09d": CloudSunRain, "09n": CloudMoonRain },
  522: { "09d": CloudRainWind, "09n": CloudRainWind },
  531: { "09d": CloudSunRain, "09n": CloudMoonRain },
  // snow
  600: { "13d": Snowflake, "13n": Snowflake },
  601: { "13d": Snowflake, "13n": Snowflake },
  602: { "13d": CloudSnow, "13n": CloudSnow },
  611: { "13d": CloudSnow, "13n": CloudSnow },
  612: { "13d": CloudSnow, "13n": CloudSnow },
  613: { "13d": CloudSnow, "13n": CloudSnow },
  615: { "13d": Snowflake, "13n": Snowflake },
  616: { "13d": Snowflake, "13n": Snowflake },
  620: { "13d": CloudSnow, "13n": CloudSnow },
  621: { "13d": Snowflake, "13n": Snowflake },
  622: { "13d": CloudSnow, "13n": CloudSnow },
  // atmosphere
  701: { "50d": CloudFog, "50n": CloudFog },
  711: { "50d": Haze, "50n": CloudFog },
  721: { "50d": Haze, "50n": CloudFog },
  731: { "50d": Haze, "50n": CloudFog },
  741: { "50d": CloudFog, "50n": CloudFog },
  751: { "50d": Haze, "50n": CloudFog },
  761: { "50d": Haze, "50n": CloudFog },
  762: { "50d": Haze, "50n": CloudFog },
  771: { "50d": Haze, "50n": CloudFog },
  781: { "50d": Tornado, "50n": Tornado },
  // clear
  800: { "01d": Sun, "01n": MoonStar },
  // clouds
  801: { "02d": CloudSun, "02n": CloudMoon },
  802: { "03d": Cloudy, "03n": Cloudy },
  803: { "04d": Cloud, "04n": Cloud },
  804: { "04d": Cloud, "04n": Cloud },
};