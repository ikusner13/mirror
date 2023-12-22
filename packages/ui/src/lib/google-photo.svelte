<script lang="ts">
  import { photosStore } from "../store";

  photosStore.subscribe((value) => {
    console.log(value);
  });
</script>

<section>
  <img
    alt="test"
    src="https://fastly.picsum.photos/id/566/300/300.jpg?hmac=StxqNDztcSx2Ih1d__-ZobUxowXpIgctHFxedI3cz4s"
  />
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
