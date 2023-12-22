<script>
  import { messageStore } from "../store";

  messageStore.subscribe((value) => {
    console.log(value);
  });
  export let direction = "right";
</script>

<p style="text-align: {direction}">test</p>
