import { writable } from "svelte/store";

const messageStore = writable("");

const socket = new WebSocket("ws://localhost:3001");

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("It's open");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  messageStore.set(event.data);
});

export default {
  subscribe: messageStore.subscribe,
};
