<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { initialize } from "./util/TimerBackgroundWorker";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
      initialize();
    });
  },
});
</script>

<style src="./tailwind-loader.css"></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
