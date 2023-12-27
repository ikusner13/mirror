<script lang="ts">
  import { type WeatherResponse, weatherStore } from "../store";
  import { icons } from "./icon-map";

  let weather: WeatherResponse = {
    feelsLike: 0,
    temp: 0,
    weather: "weather",
  };

  weatherStore.subscribe((value) => {
    weather = value;
  });

  const Icon = icons[200]["11d"];
</script>

<section>
  <div class="condition">
    <div class="weather-row">
      <Icon />
      <span>
        {Math.round(Number(weather.temp))}&deg;
      </span>
    </div>
    <span class="weather-condition">{weather.weather}</span>
  </div>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .condition {
    margin-bottom: 5px;
  }

  .weather-condition {
    display: flex;
    justify-content: flex-end;
  }

  .weather-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
