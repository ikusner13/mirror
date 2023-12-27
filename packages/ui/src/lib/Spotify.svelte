<script lang="ts">
  import { Mic2, Music4 } from "lucide-svelte";

  import { type SpotifyDTO, spotifyStore } from "../store";

  let spotifyInfo: SpotifyDTO = {
    artist: "",
    song: "",
  };

  spotifyStore.subscribe((value) => {
    spotifyInfo = value;
  });
</script>

<section>
  {#if spotifyInfo.song === "" && spotifyInfo.artist === ""}
    <div></div>
  {:else}
    <div class="songInfo">
      <div class="flex-center">
        <Music4 size="1em" />
        <span>{spotifyInfo.song}</span>
      </div>
      <div class="flex-center">
        <Mic2 size="1em" />
        <span>{spotifyInfo.artist}</span>
      </div>
    </div>
  {/if}
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .songInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
