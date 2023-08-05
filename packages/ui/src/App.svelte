<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import { onMount } from "svelte";
  import store from "./store.js";
  import Message from "./lib/Message.svelte";

  let messages = [];

  onMount(() => {
    store.subscribe((currentMessage) => {
      messages = [...messages, currentMessage];
    });
  });
</script>

<main>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <div>
    <h1>Hello Chat</h1>

    {#each messages as message, i}
      <Message {message} direction={i % 2 == 0 ? "left" : "right"} />
    {/each}
  </div>
</main>

<style>
</style>
