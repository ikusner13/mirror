<script lang="ts">
  import { onMount } from "svelte";

  import Calendar from "./lib/Calendar.svelte";
  import Message from "./lib/Message.svelte";
  import Spotify from "./lib/Spotify.svelte";
  import Weather from "./lib/Weather.svelte";
  import DateTime from "./lib/date-time.svelte";
  import GooglePhoto from "./lib/google-photo.svelte";
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Three columns */
    grid-template-rows: auto 1fr auto; /* Three rows */
    gap: 0.5rem;
    width: 100%;
    height: 100%;
  }

  .dateTime {
    grid-column: 2 / 3; /* Center top */
    grid-row: 1;
  }

  .calendar {
    grid-column: 1 / 2; /* Bottom left */
    grid-row: 3;
    justify-self: start;
  }

  .weather {
    grid-column: 3 / 4; /* Bottom right */
    grid-row: 3;
    justify-self: end;
    align-self: end;
  }

  .photo {
    grid-column: 1 / 2; /* Top left */
    grid-row: 1;
    justify-self: start;
  }

  .message {
    grid-column: 3 / 4; /* Top right */
    grid-row: 1;
  }

  .spotify {
    grid-column: 2 / 3; /* Center bottom */
    grid-row: 3;
    align-self: end;
  }

  /* Optional: Responsive adjustments */
  @media (max-width: 768px) {
    main {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, auto);
    }

    .dateTime,
    .calendar,
    .weather,
    .photo,
    .message,
    .spotify {
      grid-column: 1;
    }

    /* Adjust the order as needed */
    .dateTime {
      grid-row: 1;
    }
    .photo {
      grid-row: 2;
    }
    .message {
      grid-row: 3;
    }
    .calendar {
      grid-row: 4;
    }
    .spotify {
      grid-row: 5;
    }
    .weather {
      grid-row: 6;
    }
  }
</style>
