<script lang="ts">
  import { Music4, Mic2 } from "lucide-svelte";
</script>

<section>
  <div class="songInfo">
    <div>song Title</div>
    <div>Artist</div>
  </div>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .songInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
