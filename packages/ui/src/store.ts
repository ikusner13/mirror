import { writable } from "svelte/store";

export const messageStore = writable("");
export const photosStore = writable([]);
export const calendarStore = writable([]);
export const spotifyStore = writable([]);
export const weatherStore = writable([]);

// setup event source
const eventSource = new EventSource("http://localhost:5000/events");

eventSource.addEventListener("spotify", (event) => {
  console.log("spotify event", event);
  const data = JSON.parse(event.data);
  spotifyStore.set(data);
});

eventSource.addEventListener("weather", (event) => {
  const data = JSON.parse(event.data);
  weatherStore.set(data);
});

eventSource.addEventListener("calendar", (event) => {
  const data = JSON.parse(event.data);
  calendarStore.set(data);
});

eventSource.addEventListener("photo", (event) => {
  const data = JSON.parse(event.data);
  photosStore.set(data);
});

// Handle errors and cleanup
eventSource.onerror = (error) => {
  console.error("EventSource failed:", error);
  eventSource.close();
};

export const closeEventSource = () => {
  eventSource.close();
};
