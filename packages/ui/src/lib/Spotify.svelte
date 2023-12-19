<script lang="ts">
  import { Mic2, Music4 } from "lucide-svelte";
</script>

<section>
  <div class="songInfo">
    <div class="flex-center">
      <Music4 size="1em" />
      <span>Song Title</span>
    </div>
    <div class="flex-center">
      <Mic2 size="1em" />
      <span>Artist</span>
    </div>
  </div>
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
