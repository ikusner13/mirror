<script lang="ts">
  import { weatherStore } from "../store";
  import { icons } from "./icon-map";

  weatherStore.subscribe((value) => {
    console.log(value);
  });

  const weather = {
    condition: "sunny",
    temp: 80,
  };
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
    <span class="weather-condition">{weather.condition}</span>
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
