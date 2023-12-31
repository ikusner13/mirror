import renderToString from "preact-render-to-string";

export type WeatherResponse = {
  feelsLike?: number;
  icon: string;
  temp?: number;
  weather?: string;
};

type WeatherTemplateProps = {
  weather: WeatherResponse;
};

function WeatherTemplate(props: WeatherTemplateProps) {
  const { weather } = props;

  return (
    <div>
      <div className="flex items-center gap-2 justify-end">
        <i className={weather.icon}></i>
        <span>{Math.round(Number(weather.temp))}&deg;</span>
      </div>
      <span className="flex justify-end">{weather.weather}</span>
      <span className="flex justify-end">
        Feels like {Math.round(Number(weather.feelsLike))}&deg;
      </span>
    </div>
  );
}

export function generateWeatherHTML(weather: WeatherResponse) {
  return renderToString(<WeatherTemplate weather={weather} />);
}
