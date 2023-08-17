<script lang="ts">
  import dayjs from "dayjs";
  import { onDestroy, onMount } from "svelte";

  let date = new Date();
  let currentDate = dayjs().format("DD/MM/YYYY");
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout;
  $: hour = date.getHours();
  $: min = date.getMinutes();
  $: sec = date.getSeconds();
  let dayOrNight = "AM";

  const updateDateAtMidNight = () => {
    const now = dayjs();
    const midnight = now.endOf("day");
    const timeToMidnight = midnight.diff(now, "second");

    timeout = setTimeout(() => {
      currentDate = dayjs().format("DD/MM/YYYY");
      updateDateAtMidNight();
    }, timeToMidnight * 1000);
  };

  onMount(() => {
    const interval = setInterval(() => {
      date = new Date();
      dayOrNight = hour >= 12 ? "PM" : "AM";
    }, 1000);

    updateDateAtMidNight();

    return () => clearInterval(interval);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<section>
  <div id="" class="clockWrapper">
    <p class="clockDisplay">
      {hour < 12 ? hour : hour - 12} : {min} : {sec}
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
    font-size: 1rem;
    color: #ffffff;
  }
</style>
