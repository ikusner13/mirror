<script lang="ts">
  const weather = {
    condition: "sunny",
    temp: 80,
  };
</script>

<section>
  <div class="condition">
    <div>
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
