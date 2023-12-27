<script lang="ts">
  import dayjs from "dayjs";
  import { onDestroy } from "svelte";

  let currentDate = dayjs().format("MM/DD/YYYY");
  const now = new Date();
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();
  let currentSec = now.getSeconds();
  let dayOrNight = currentHour >= 12 ? "PM" : "AM";

  // Update time every second
  const updateTime = () => {
    const now = new Date();
    currentHour = now.getHours();
    currentMin = now.getMinutes();
    currentSec = now.getSeconds();
    dayOrNight = currentHour >= 12 ? "PM" : "AM";

    // Check if date has changed
    const newDate = dayjs().format("MM/DD/YYYY");
    if (newDate !== currentDate) {
      currentDate = newDate;
    }
  };

  let interval = setInterval(updateTime, 1000);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<section>
  <div class="clockWrapper">
    <p class="clockDisplay">
      {currentHour % 12 || 12}:{currentMin < 10
        ? `0${currentMin}`
        : currentMin}:{currentSec < 10 ? `0${currentSec}` : currentSec}
      {dayOrNight}
    </p>
    <p>
      {currentDate}
    </p>
  </div>
</section>

<style>
  section,
  .clockWrapper,
  .clockDisplay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .clockDisplay {
    font-size: 1.25rem;
    color: #ffffff;
  }
</style>
