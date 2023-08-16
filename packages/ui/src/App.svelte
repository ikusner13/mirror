<script lang="ts">
  import { onMount } from "svelte";

  import Calendar from "./lib/Calendar.svelte";
  import DateTime from "./lib/DateTime.svelte";
  import GooglePhoto from "./lib/GooglePhoto.svelte";
  import Message from "./lib/Message.svelte";
  import Spotify from "./lib/Spotify.svelte";
  import Weather from "./lib/Weather.svelte";
  import store from "./store.js";

  let messages = [];

  onMount(() => {
    store.subscribe((currentMessage) => {
      messages = [...messages, currentMessage];
    });
  });
</script>

<main class="main">
  <section class="dateTime">
    <DateTime />
  </section>

  <section class="calendar">
    <Calendar />
  </section>

  <section class="weather">
    <Weather />
  </section>

  <section class="photo">
    <GooglePhoto />
  </section>

  <section class="message">
    <Message message="test" />
  </section>

  <section class="spotify">
    <Spotify />
  </section>
</main>

<style>
  main {
    min-height: calc(100vh - 4rem);
    width: 100%;
    height: 100%;
    position: relative;
  }

  main > section {
    position: absolute;
  }
  .calendar {
    bottom: 0;
    left: 0;
  }

  .dateTime {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .weather {
    bottom: 0;
    right: 0;
  }

  .photo {
    top: 0;
    left: 0;
  }

  .message {
    top: 0;
    right: 0;
  }

  .spotify {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
