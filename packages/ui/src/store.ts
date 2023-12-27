import { writable } from "svelte/store";

export type WeatherResponse = {
  feelsLike: number;
  temp: number;
  weather: string;
};

export type SpotifyDTO = {
  artist: string;
  song: string;
};

export type CalendarDTO = {
  id: string;
  kind: string;
  startDateTime: string;
  summary: string;
};

export const messageStore = writable("");
export const photosStore = writable("");
export const calendarStore = writable<CalendarDTO[]>([]);
export const spotifyStore = writable<SpotifyDTO>({
  artist: "",
  song: "",
});
export const weatherStore = writable<WeatherResponse>({
  feelsLike: 0,
  temp: 0,
  weather: "",
});

// setup event source
const eventSource = new EventSource("http://localhost:5000/events");

eventSource.addEventListener("spotify", (event) => {
  const data = JSON.parse(event.data) as SpotifyDTO;
  spotifyStore.set(data);
});

eventSource.addEventListener("weather", (event) => {
  const data = JSON.parse(event.data) as WeatherResponse;
  console.log("weather", data);
  weatherStore.set(data);
});

eventSource.addEventListener("calendar", (event) => {
  const data = JSON.parse(event.data) as CalendarDTO[];
  console.log("calendar", data);
  calendarStore.set(data);
});

eventSource.addEventListener("photo", (event) => {
  const data = JSON.parse(event.data) as string;
  console.log("photo", data);
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
