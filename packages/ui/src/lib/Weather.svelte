<script lang="ts">
  import { icons } from "./icon-map";

  const weather = {
    condition: "sunny",
    temp: 80,
  };
  const Icon = icons[200]["11d"];
</script>

<section>
  <div class="condition">
    <div>
      <Icon />
      <span class="temp">
        {Math.round(Number(weather.temp))}&deg;
      </span>
    </div>
    <span>{weather.condition}</span>
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

  .temp {
    margin-bottom: 5px;
    margin-right: 3px;
  }
</style>
