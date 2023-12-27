<script lang="ts">
  import { photosStore } from "../store";

  let photoUrl = "";

  photosStore.subscribe((value) => {
    photoUrl = value;
  });
</script>

<section>
  <img alt="test" src={photoUrl} />
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 300px;
    height: 300px;
  }
</style>
