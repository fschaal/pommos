<template>
  <div
    class="
      flex flex-col
      justify-between
      p-2
      bg-gray-100
      w-full
      h-screen
    "
  >
    <div class="w-full">
      <router-link to="/">
        <img
          class="w-6"
          src="../assets/arrow-left.svg"
          alt=""
        />
      </router-link>
    </div>
    <div class="flex flex-col justify-center items-center">
      <duration-slider
        ref="focusDurationSlider"
        :round-type="RoundType.Focus"
        :default-duration="25"
        @onchange="updateFocusDuration"
      >
        ></duration-slider
      >
      <duration-slider
        ref="breakDurationSlider"
        :round-type="RoundType.Break"
        :default-duration="5"
        @onchange="updateBreakDuration"
      >
        ></duration-slider
      >
      <duration-slider
        ref="longBreakDurationSlider"
        :round-type="RoundType.LongBreak"
        :default-duration="15"
        @onchange="updateLongBreakDuration"
      >
        ></duration-slider
      >
    </div>
    <div class="flex justify-center">
      <a
        class="text-appText text-1xl font-medium"
        href="#"
        @click="resetDefaults"
        >Reset Defaults</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import "./styles/sliderTheme.scss";
import { RootMutations } from "../store/mutations";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import DurationSlider from "../components/DurationSlider.vue";
import { RoundType } from "../models";

export default defineComponent({
  name: "Settings",
  components: { DurationSlider },
  setup() {
    const store = useStore();
    const focusDurationSlider = ref(null);
    const breakDurationSlider = ref(null);
    const longBreakDurationSlider = ref(null);

    const resetDefaults = () => {
      focusDurationSlider.value.reset();
      breakDurationSlider.value.reset();
      longBreakDurationSlider.value.reset();
    };

    const updateFocusDuration = (focusDuration: number) => {
      store.commit(
        RootMutations.SET_FOCUS_DURATION,
        focusDuration
      );
    };

    const updateBreakDuration = (breakDuration: number) => {
      store.commit(
        RootMutations.SET_BREAK_DURATION,
        breakDuration
      );
    };

    const updateLongBreakDuration = (
      longBreakDuration: number
    ) => {
      store.commit(
        RootMutations.SET_LONG_BREAK_DURATION,
        longBreakDuration
      );
    };

    return {
      resetDefaults,
      RoundType,
      focusDurationSlider,
      breakDurationSlider,
      longBreakDurationSlider,
      updateFocusDuration,
      updateBreakDuration,
      updateLongBreakDuration,
    };
  },
});
</script>

<style scoped></style>
