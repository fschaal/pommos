<template>
  <div
    class="
      flex flex-col
      w-full
      justify-center
      items-center
      text-center
    "
  >
    <span class="text-1xl font-bold">{{ roundType }}</span>
    <div
      class="
        flex
        h-6
        w-12
        bg-appText
        text-white
        justify-center
        items-center
        text-center
        rounded-sm
      "
    >
      <span class="text-xs">{{ formattedDuration }}</span>
    </div>
    <vue-slider
      v-model="duration"
      class="w-full mt-2"
      v-bind="sliderOptions"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import VueSlider from "vue-slider-component";
import { useStore } from "vuex";
import TimeConverter from "../util/TimeConverter";
import { RoundType } from "../models";

export default defineComponent({
  name: "DurationSlider",
  components: { VueSlider },
  props: {
    roundType: RoundType,
    defaultDuration: {
      type: Number,
      required: true,
    },
  },
  emits: ["onchange"],
  setup(props, { emit }) {
    const store = useStore();

    const sliderOptions = ref({
      dotSize: 14,
      width: "full",
      height: 4,
      tooltip: "none",
      min: 1,
      max: 200,
    });

    let duration: ref<number>;
    let formattedDuration: computed<string>;

    switch (props.roundType) {
      case RoundType.Focus:
        duration = ref(store.getters.focusDuration);
        formattedDuration = computed(() => {
          return TimeConverter.timeToString(
            store.getters.focusDuration
          );
        });
        break;
      case RoundType.Break:
        duration = ref(store.getters.breakDuration);
        formattedDuration = computed(() => {
          return TimeConverter.timeToString(
            store.getters.breakDuration
          );
        });
        break;
      case RoundType.LongBreak:
        duration = ref(store.getters.longBreakDuration);
        formattedDuration = computed(() => {
          return TimeConverter.timeToString(
            store.getters.longBreakDuration
          );
        });
        break;
    }

    const reset = () => {
      duration.value = props.defaultDuration;
    };

    watch(duration, () => {
      emit("onchange", duration.value);
    });

    return {
      sliderOptions,
      duration,
      formattedDuration,
      reset,
    };
  },
});
</script>
