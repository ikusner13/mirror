<script lang="ts">
  import { Cake, Calendar, Heart } from "lucide-svelte";

  import { type CalendarDTO, calendarStore } from "../store";
  import { getCalendarDisplay } from "./dayjs-calendar";

  let calendarEvents: CalendarDTO[] = [];

  calendarStore.subscribe((value) => {
    calendarEvents = value;
  });
</script>

<div class="events-container">
  {#if calendarEvents.length === 0}
    <div>
      <span> No upcoming events </span>
    </div>
  {/if}
  {#each calendarEvents as calendarEvent}
    <div>
      <div class="event-item">
        <Calendar size="1em" />
        <span>
          {calendarEvent.summary}
        </span>
      </div>
      <div>
        <span class="date">
          {getCalendarDisplay(calendarEvent.startDateTime)}
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
