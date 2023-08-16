<script lang="ts">
  import { Calendar } from "lucide-svelte";
  const calendarEvents = [
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
    <div class="event-item">
      <Calendar />
      <span>
        {calendarEvent.title}
      </span>
      <span>
        {calendarEvent.dateTime}
      </span>
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
</style>
