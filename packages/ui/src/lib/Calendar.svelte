<script lang="ts">
  import { Cake, Calendar, Heart } from "lucide-svelte";

  import { getCalendarDisplay } from "./dayjs-calendar";

  const calendarEvents = [
    {
      dateTime: "2023-09-02T00:00:00.000Z",
      title: "My event",
    },
    {
      dateTime: "2021-01-02T00:00:00.000Z",
      title: "My event 2",
    },
    {
      dateTime: "2021-01-01T00:00:00.000Z",
      title: "My event",
    },
    {
      dateTime: "2021-01-02T00:00:00.000Z",
      title: "My event 2",
    },
    {
      dateTime: "2021-01-01T00:00:00.000Z",
      title: "My event",
    },
    {
      dateTime: "2021-01-02T00:00:00.000Z",
      title: "My event 2",
    },
    {
      dateTime: "2021-01-01T00:00:00.000Z",
      title: "My event",
    },
    {
      dateTime: "2021-01-02T00:00:00.000Z",
      title: "My event 2",
    },
  ];
</script>

<div class="events-container">
  {#each calendarEvents as calendarEvent}
    <div>
      <div class="event-item">
        <Calendar size="1em" />
        <span>
          {calendarEvent.title}
        </span>
      </div>
      <div>
        <span class="date">
          {getCalendarDisplay(calendarEvent.dateTime)}
        </span>
      </div>
    </div>
  {/each}
</div>

<style>
  .events-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .event-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .date {
    font-size: 0.75em;
  }
</style>
